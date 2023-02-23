// Modified from https://github.com/laurenashpole/react-inner-image-zoom

var _this = this

import React, {
  ChangeEvent,
  DragEvent,
  Fragment,
  MutableRefObject,
  TransitionEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"
import { ImageProps } from "next/image"

import Image from "./components/Image"
import ZoomImage from "./components/ZoomImage"
import FullscreenPortal from "./components/FullscreenPortal"

import "./styles.min.css"

type InnerImageZoomPropsType = {
  moveType?: "pan" | "drag" | undefined
  zoomType?: "click" | "hover" | undefined
  src: string
  alt?: string
  title?: string
  sources?:
    | Array<{ srcSet?: string | undefined; media?: string | undefined }>
    | undefined
  width?: number | undefined
  height?: number | undefined
  hasSpacer?: boolean | undefined
  imgAttributes?: ImageProps | undefined
  zoomSrc?: string | undefined
  zoomScale?: number | undefined
  zoomPreload?: boolean | undefined
  fadeDuration?: number | undefined
  fullscreenOnMobile?: boolean | undefined
  mobileBreakpoint?: number | undefined
  hideCloseButton?: boolean | undefined
  hideHint?: boolean | undefined
  className?: string | undefined
  afterZoomIn?: (() => void) | undefined
  afterZoomOut?: (() => void) | undefined
}

type ImagePropsWidthHeightType = {
  width?: number
  height?: number
}

type ImagePropsCoordinatesType = {
  x?: number
  y?: number
}

type ImagePropsBoundsType = ImagePropsWidthHeightType & {
  left?: 0
  top?: 0
}

type PageBoundsType = { pageX: number; pageY: number }

type ImagePropsType = {
  onLoadCallback?: () => void
  bounds?: ImagePropsBoundsType | DOMRect
  offsets?: ImagePropsCoordinatesType
  ratios?: ImagePropsCoordinatesType
  eventPosition?: ImagePropsCoordinatesType
  scaledDimensions?: ImagePropsWidthHeightType
}

const InnerImageZoom = ({
  moveType = "pan",
  zoomType = "click",
  src,
  sources,
  width,
  height,
  hasSpacer,
  imgAttributes = { src: "", alt: "" },
  zoomSrc,
  zoomScale = 1,
  zoomPreload,
  fadeDuration = 150,
  fullscreenOnMobile = false,
  mobileBreakpoint = 640,
  hideCloseButton,
  hideHint,
  className,
  afterZoomIn,
  afterZoomOut,
  alt,
  title,
}: InnerImageZoomPropsType) => {
  var img = useRef<HTMLImageElement | null>(null)
  var zoomImg = useRef<HTMLImageElement | null>(null)
  var imgProps = useRef<ImagePropsType>({})

  var _useState = useState(zoomPreload),
    isActive = _useState[0],
    setIsActive = _useState[1]

  var _useState2 = useState(false),
    isTouch = _useState2[0],
    setIsTouch = _useState2[1]

  var _useState3 = useState(false),
    isZoomed = _useState3[0],
    setIsZoomed = _useState3[1]

  var _useState4 = useState(false),
    isFullscreen = _useState4[0],
    setIsFullscreen = _useState4[1]

  var _useState5 = useState(false),
    isDragging = _useState5[0],
    setIsDragging = _useState5[1]

  var _useState6 = useState(false),
    isValidDrag = _useState6[0],
    setIsValidDrag = _useState6[1]

  var _useState7 = useState(false),
    isFading = _useState7[0],
    setIsFading = _useState7[1]

  var _useState8 = useState(moveType),
    currentMoveType = _useState8[0],
    setCurrentMoveType = _useState8[1]

  var _useState9 = useState(0),
    left = _useState9[0],
    setLeft = _useState9[1]

  var _useState10 = useState(0),
    top = _useState10[0],
    setTop = _useState10[1]

  var handleMouseEnter = function handleMouseEnter(e: ChangeEvent) {
    setIsActive(true)
    setIsFading(false)
    zoomType === "hover" && !isZoomed && handleClick(e as unknown as MouseEvent)
  }

  var handleTouchStart = function handleTouchStart() {
    setIsTouch(true)
    setIsFullscreen(getFullscreenStatus(fullscreenOnMobile, mobileBreakpoint))
    setCurrentMoveType("drag")
  }

  const handleClick = (e: MouseEvent) => {
    if (isZoomed) {
      if (isTouch) {
        hideCloseButton && handleClose(e as unknown as ChangeEvent)
      } else {
        !isValidDrag && zoomOut()
      }

      return
    }

    isTouch && setIsActive(true)

    if (zoomImg.current) {
      handleLoad({
        target: zoomImg.current,
      })
      zoomIn(e.pageX, e.pageY)
    } else {
      imgProps.current.onLoadCallback = zoomIn.bind(_this, e.pageX, e.pageY)
    }
  }

  const handleLoad = (e: {
    target: MutableRefObject<HTMLImageElement>["current"]
  }) => {
    var scaledDimensions = getScaledDimensions(e.target, zoomScale)
    zoomImg.current = e.target
    zoomImg.current?.setAttribute("width", scaledDimensions.width.toString())
    zoomImg.current?.setAttribute("height", scaledDimensions.height.toString())
    imgProps.current.scaledDimensions = scaledDimensions
    imgProps.current.bounds = getBounds(img.current, false)
    imgProps.current.ratios = getRatios(
      imgProps.current.bounds,
      scaledDimensions
    )

    if (imgProps.current.onLoadCallback) {
      imgProps.current.onLoadCallback && imgProps.current.onLoadCallback()
      // imgProps.current.onLoadCallback = null
    }
  }

  const handleMouseMove = (e: PageBoundsType) => {
    var left = e.pageX - (imgProps.current.offsets?.x ?? 0)
    var top = e.pageY - (imgProps.current.offsets?.y ?? 0)
    left = Math.max(Math.min(left, imgProps.current.bounds?.width ?? 0), 0)
    top = Math.max(Math.min(top, imgProps.current.bounds?.height ?? 0), 0)
    setLeft(left * -(imgProps.current.ratios?.x ?? 0))
    setTop(top * -(imgProps.current.ratios?.y ?? 0))
  }

  const handleDragStart = (e: TouchEvent | DragEvent) => {
    const pageX = Object.hasOwn(e, "pageX")
      ? (e as DragEvent).pageX
      : (e as TouchEvent).changedTouches[0].pageX
    const pageY = Object.hasOwn(e, "pageY")
      ? (e as DragEvent).pageY
      : (e as TouchEvent).changedTouches[0].pageY

    imgProps.current.offsets = getOffsets(
      pageX,
      pageY,
      zoomImg.current?.offsetLeft ?? 0,
      zoomImg.current?.offsetTop ?? 0
    )
    setIsDragging(true)

    if (!isTouch && Object.hasOwn(e, "pageX")) {
      imgProps.current.eventPosition = {
        x: (e as DragEvent).pageX,
        y: (e as DragEvent).pageY,
      }
    }
  }

  const handleDragMove = useCallback(
    (e: Event) => {
      e.stopPropagation()
      const pageX = Object.hasOwn(e, "pageX")
        ? (e as unknown as DragEvent).pageX
        : (e as TouchEvent).changedTouches[0].pageX
      const pageY = Object.hasOwn(e, "pageY")
        ? (e as unknown as DragEvent).pageY
        : (e as TouchEvent).changedTouches[0].pageY

      var left = pageX - (imgProps.current.offsets?.x ?? 0)
      var top = pageY - (imgProps.current.offsets?.y ?? 0)
      left = Math.max(
        Math.min(left, 0),
        ((imgProps.current.scaledDimensions?.width ?? 0) -
          (imgProps.current.bounds?.width ?? 0)) *
          -1
      )
      top = Math.max(
        Math.min(top, 0),
        ((imgProps.current.scaledDimensions?.height ?? 0) -
          (imgProps.current.bounds?.height ?? 0)) *
          -1
      )
      setLeft(left)
      setTop(top)
    },
    [setLeft, setTop]
  )

  const handleDragEnd = (e: MouseEvent) => {
    setIsDragging(false)

    if (!isTouch) {
      var moveX = Math.abs(e.pageX - (imgProps.current.eventPosition?.x ?? 0))
      var moveY = Math.abs(e.pageY - (imgProps.current.eventPosition?.y ?? 0))
      setIsValidDrag(moveX > 5 || moveY > 5)
    }
  }

  const handleMouseLeave = (e: MouseEvent) => {
    currentMoveType === "drag" && isZoomed
      ? handleDragEnd(e)
      : handleClose(e as unknown as ChangeEvent)
  }

  const handleClose = (e: ChangeEvent) => {
    if (!(!isTouch && e.target?.classList.contains("iiz__close"))) {
      if (!isZoomed || isFullscreen || !fadeDuration) {
        handleFadeOut({} as TransitionEvent<HTMLImageElement>, true)
      } else {
        setIsFading(true)
      }
    }

    zoomOut()
  }

  const handleFadeOut = (
    e: TransitionEvent<HTMLImageElement>,
    noTransition: boolean
  ) => {
    if (
      noTransition ||
      (e.propertyName === "opacity" && img.current?.contains(e.target as Node))
    ) {
      if ((zoomPreload && isTouch) || !zoomPreload) {
        zoomImg.current = null
        imgProps.current = getDefaults()
        setIsActive(false)
      }

      setIsTouch(false)
      setIsFullscreen(false)
      setCurrentMoveType(moveType)
      setIsFading(false)
    }
  }

  var initialMove = function initialMove(pageX: number, pageY: number) {
    imgProps.current.offsets = getOffsets(
      window.pageXOffset,
      window.pageYOffset,
      -(imgProps.current.bounds?.left ?? 0),
      -(imgProps.current.bounds?.top ?? 0)
    )
    handleMouseMove({
      pageX: pageX,
      pageY: pageY,
    })
  }

  var initialDrag = function initialDrag(pageX: number, pageY: number) {
    var initialPageX =
      (pageX - (window.pageXOffset + (imgProps.current.bounds?.left ?? 0))) *
      -(imgProps.current.ratios?.x ?? 0)
    var initialPageY =
      (pageY - (window.pageYOffset + (imgProps.current.bounds?.top ?? 0))) *
      -(imgProps.current.ratios?.y ?? 0)
    initialPageX =
      initialPageX +
      (isFullscreen
        ? (window.innerWidth - (imgProps.current.bounds?.width ?? 0)) / 2
        : 0)
    initialPageY =
      initialPageY +
      (isFullscreen
        ? (window.innerHeight - (imgProps.current.bounds?.height ?? 0)) / 2
        : 0)
    imgProps.current.bounds = getBounds(img.current, isFullscreen)
    imgProps.current.offsets = getOffsets(0, 0, 0, 0)
    handleDragMove({
      changedTouches: [
        {
          pageX: initialPageX,
          pageY: initialPageY,
        },
      ],
      preventDefault: function preventDefault() {},
      stopPropagation: function stopPropagation() {},
    } as unknown as Event)
  }

  var zoomIn = function zoomIn(pageX: number, pageY: number) {
    setIsZoomed(true)
    currentMoveType === "drag"
      ? initialDrag(pageX, pageY)
      : initialMove(pageX, pageY)
    afterZoomIn && afterZoomIn()
  }

  var zoomOut = function zoomOut() {
    setIsZoomed(false)
    afterZoomOut && afterZoomOut()
  }

  const getDefaults = (): ImagePropsType => {
    return {
      onLoadCallback: undefined,
      bounds: {},
      offsets: {},
      ratios: {},
      eventPosition: {},
      scaledDimensions: {},
    }
  }

  const getBounds = (
    img: HTMLImageElement | null | undefined,
    isFullscreen: boolean
  ): ImagePropsBoundsType | DOMRect | undefined => {
    if (isFullscreen) {
      return {
        width: window.innerWidth,
        height: window.innerHeight,
        left: 0,
        top: 0,
      }
    }

    return img?.getBoundingClientRect()
  }

  const getOffsets = (
    pageX: number,
    pageY: number,
    left: number,
    top: number
  ): ImagePropsCoordinatesType => {
    return {
      x: pageX - left,
      y: pageY - top,
    }
  }

  const getRatios = (
    bounds: ImagePropsBoundsType | DOMRect | undefined,
    dimensions: ImagePropsWidthHeightType
  ): ImagePropsCoordinatesType => {
    return {
      x:
        ((dimensions.width ?? 0) - (bounds?.width ?? 0)) / (bounds?.width ?? 0),
      y:
        ((dimensions.height ?? 0) - (bounds?.height ?? 0)) /
        (bounds?.height ?? 0),
    }
  }

  var getFullscreenStatus = function getFullscreenStatus(
    fullscreenOnMobile: boolean,
    mobileBreakpoint: number
  ) {
    return (
      fullscreenOnMobile &&
      window.matchMedia &&
      window.matchMedia("(max-width: " + mobileBreakpoint + "px)").matches
    )
  }

  var getScaledDimensions = function getScaledDimensions(
    zoomImg: HTMLImageElement,
    zoomScale: number
  ) {
    return {
      width: zoomImg.naturalWidth * zoomScale,
      height: zoomImg.naturalHeight * zoomScale,
    }
  }

  var zoomImageProps = {
    src: zoomSrc || src,
    fadeDuration: isFullscreen ? 0 : fadeDuration,
    top: top,
    left: left,
    isZoomed: isZoomed,
    width: width,
    height: height,
    alt: alt,
    onLoad: handleLoad,
    onDragStart: currentMoveType === "drag" ? handleDragStart : null,
    onDragEnd: currentMoveType === "drag" ? handleDragEnd : null,
    onClose:
      !hideCloseButton && currentMoveType === "drag" ? handleClose : null,
    onFadeOut: isFading ? handleFadeOut : null,
  }
  useEffect(function () {
    imgProps.current = getDefaults()
  }, [])
  useEffect(
    function () {
      getFullscreenStatus(fullscreenOnMobile, mobileBreakpoint) &&
        setIsActive(false)
    },
    [fullscreenOnMobile, mobileBreakpoint, setIsActive]
  )
  useEffect(
    function () {
      if (!zoomImg.current) {
        return
      }

      var eventType = isTouch ? "touchmove" : "mousemove"

      if (isDragging) {
        zoomImg.current.addEventListener(eventType, handleDragMove, {
          passive: true,
        })
      } else {
        zoomImg.current.removeEventListener(eventType, handleDragMove)
      }
    },
    [isDragging, isTouch, handleDragMove]
  )
  return /*#__PURE__*/ React.createElement(
    "figure",
    {
      className:
        "iiz " +
        (currentMoveType === "drag" ? "iiz--drag" : "") +
        " " +
        (className ? className : ""),
      style: {
        width: width,
      },
      ref: img,
      onTouchStart: isZoomed ? null : handleTouchStart,
      onClick: handleClick,
      onMouseEnter: isTouch ? null : handleMouseEnter,
      onMouseMove:
        currentMoveType === "drag" || !isZoomed ? null : handleMouseMove,
      onMouseLeave: isTouch ? null : handleMouseLeave,
    },
    /*#__PURE__*/ React.createElement(Image, {
      src: src,
      width: width,
      height: height,
      hasSpacer: hasSpacer,
      imgAttributes: imgAttributes,
      fadeDuration: fadeDuration,
      isZoomed: isZoomed,
      alt,
      title,
    }),
    isActive &&
      /*#__PURE__*/ React.createElement(
        Fragment,
        null,
        isFullscreen
          ? /*#__PURE__*/ React.createElement(
              FullscreenPortal,
              null,
              /*#__PURE__*/ React.createElement(ZoomImage, zoomImageProps)
            )
          : /*#__PURE__*/ React.createElement(ZoomImage, zoomImageProps)
      ),
    !hideHint &&
      !isZoomed &&
      /*#__PURE__*/ React.createElement("span", {
        className: "iiz__btn iiz__hint rounded-md",
      })
  )
}

export default InnerImageZoom

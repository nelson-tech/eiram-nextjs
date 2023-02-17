type DiscountFormPropsType = {
  styles?: string
}

const DiscountForm = ({ styles = "" }: DiscountFormPropsType) => {
  return (
    <form className={styles}>
      <label
        htmlFor="discount-code"
        className="block text-sm font-medium text-gray-700"
      >
        {" "}
        Discount code{" "}
      </label>
      <div className="flex space-x-4 mt-1">
        <input
          type="text"
          id="discount-code"
          name="discount-code"
          className="block w-full p-2 border-gray-300 rounded-md shadow-sm focus:ring-accent focus:border-accent sm:text-sm"
        />
        <button
          type="submit"
          className="bg-gray-200 text-sm p-2 font-medium text-gray-600 rounded-md px-4 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-accent"
        >
          Apply
        </button>
      </div>
    </form>
  )
}

export default DiscountForm

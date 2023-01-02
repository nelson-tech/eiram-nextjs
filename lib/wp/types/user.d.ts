type WP_User = {
	id: number
	name: string
	url: string
	description: string
	link: string
	slug: string
	avatar_urls: { [key: string]: string }
	_links: {
		self: { href: string }[]
		collection: { href: string }[]
	}
	meta: []
	acf: []
	is_super_admin: true
	woocommerce_meta: {
		activity_panel_inbox_last_read: ""
		activity_panel_reviews_last_read: ""
		categories_report_columns: ""
		coupons_report_columns: ""
		customers_report_columns: ""
		orders_report_columns: ""
		products_report_columns: ""
		revenue_report_columns: ""
		taxes_report_columns: ""
		variations_report_columns: ""
		dashboard_sections: ""
		dashboard_chart_type: ""
		dashboard_chart_interval: ""
		dashboard_leaderboard_rows: ""
		homepage_layout: ""
		homepage_stats: ""
		task_list_tracked_started_tasks: ""
		help_panel_highlight_shown: ""
		android_app_banner_dismissed: ""
	}
}

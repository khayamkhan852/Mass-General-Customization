# Copyright (c) 2025, Khayam Khan and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class MonthlyOnboarding(Document):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.types import DF
		from mass_general_customization.mass_general_customization.doctype.onboarding_list.onboarding_list import OnboardingList
		from mass_general_customization.mass_general_customization.doctype.onboarding_staff.onboarding_staff import OnboardingStaff

		net_balance: DF.Currency
		onboarding_date: DF.Date
		onboarding_lists: DF.Table[OnboardingList]
		onboarding_staffs: DF.Table[OnboardingStaff]
		total_onboarding_expense: DF.Currency
		total_sales_collection: DF.Currency
	# end: auto-generated types
	
	def validate(self):
		"""Validate the document before saving."""
		
		total_onboarding_expense = 0
		
		for onboarding_staff in self.onboarding_staffs:
			total_onboarding_expense += onboarding_staff.total

		self.total_onboarding_expense = total_onboarding_expense

		total_sales_collection = 0
		
		for onboarding_list in self.onboarding_lists:
			total_sales_collection += onboarding_list.achievement

		self.total_sales_collection = total_sales_collection

		self.net_balance = self.total_sales_collection - self.total_onboarding_expense

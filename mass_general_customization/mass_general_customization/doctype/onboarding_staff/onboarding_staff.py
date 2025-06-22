# Copyright (c) 2025, Khayam Khan and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class OnboardingStaff(Document):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.types import DF

		employee: DF.Link
		expenses: DF.Currency
		full_name: DF.Data | None
		parent: DF.Data
		parentfield: DF.Data
		parenttype: DF.Data
		salary: DF.Currency
		total: DF.Currency
	# end: auto-generated types
	pass

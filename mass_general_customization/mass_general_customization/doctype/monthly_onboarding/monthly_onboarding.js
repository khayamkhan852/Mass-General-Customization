// Copyright (c) 2025, Khayam Khan and contributors
// For license information, please see license.txt

frappe.ui.form.on("Monthly Onboarding", {
	refresh(frm) {
        frm.trigger("calculate_total_onboarding");
        frm.trigger("calculate_total_onboarding_list");
        frm.trigger("calculate_net_balance");
	},

    total_onboarding_expense(frm) {
        frm.trigger("calculate_net_balance");
    },

    total_sales_collection(frm) {
        frm.trigger("calculate_net_balance");
    },

    calculate_net_balance(frm) {
        let total_onboarding = frm.doc.total_onboarding_expense || 0;
        let total_sales_collection = frm.doc.total_sales_collection || 0;

        let net_balance = total_sales_collection - total_onboarding;

        frm.set_value("net_balance", net_balance);
        
        frm.refresh_field("net_balance");
    },

    calculate_total_onboarding(frm) {
        let total_onboarding = 0;

        frm.doc.onboarding_staffs.forEach(onboarding_staff => {
            total_onboarding += onboarding_staff.total;
        });

        frm.set_value("total_onboarding_expense", total_onboarding);
        
        frm.refresh_field("total_onboarding_expense");    
    },

    calculate_total_onboarding_list(frm) {
        let total_onboarding_list = 0;

        frm.doc.onboarding_lists.forEach(onboarding_list => {
            total_onboarding_list += onboarding_list.achievement;
        });

        frm.set_value("total_sales_collection", total_onboarding_list);
        
        frm.refresh_field("total_sales_collection");    
    },    

});

frappe.ui.form.on("Onboarding Staff", {
    salary(frm, cdt, cdn) {
        frm.trigger("calculate_total", cdt, cdn);
    },

    expenses(frm, cdt, cdn) {
        frm.trigger("calculate_total", cdt, cdn);
    },
   
    onboarding_staffs_add(frm, cdt, cdn) {
        frm.trigger("calculate_total_onboarding");
    },
   
    onboarding_staffs_remove(frm) {
        frm.trigger("calculate_total_onboarding");
    },

    calculate_total(frm, cdt, cdn) {
        let row = locals[cdt][cdn];
        
        row.total = row.salary + row.expenses;

        frm.refresh_field("onboarding_staffs");

        frm.trigger("calculate_total_onboarding");
    }
});

frappe.ui.form.on("Onboarding List", {
    actual(frm, cdt, cdn) {
        frm.trigger("calculate_achievement", cdt, cdn);
    },

    target(frm, cdt, cdn) {
        frm.trigger("calculate_achievement", cdt, cdn);
    },

    onboarding_lists_add(frm, cdt, cdn) {
        frm.trigger("calculate_total_onboarding_list");
    },
   
    onboarding_lists_remove(frm) {
        frm.trigger("calculate_total_onboarding_list");
    },    

    calculate_achievement(frm, cdt, cdn) {
        let row = locals[cdt][cdn];

        if (row.actual > row.target) {
            row.achievement = row.actual - row.target;
        } else {
            row.achievement = 0;
        }
        
        frm.refresh_field("onboarding_lists");

        frm.trigger("calculate_total_onboarding_list");
    }
});


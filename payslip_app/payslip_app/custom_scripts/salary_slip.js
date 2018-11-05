

//bench execute payslip_app.payslip_app.get_mtd --kwargs "{'employee':'EMP/0001'}"
 frappe.ui.form.on('Salary Slip', {
     validate: function (frm) {

         frm.doc.ytd_earnings = [];
         frm.doc.mtd_earnings = [];
         frm.doc.ytd_deductions = [];
         frm.doc.mtd_deductions = [];

        if(frm.doc.employee) {

            // console.log(frm.doc.employee);
            // console.log(frm.doc.posting_date);

            if(frm.doc.payroll_frequency!='Monthly') {
                frappe.call({
                    'method': 'payslip_app.payslip_app.get_mtd',
                    'args': {
                        'employee': frm.doc.employee,
                        'posting_date': frm.doc.posting_date
                    },
                    'callback': function (res) {
                        console.log(res);
                        if (res.message) {


                            frm.doc.mtd_earnings = [];


                            for (var i = 0; i < res.message.length; i++) {
                                var found = 0;
                                var add_amount = 0;
                                for (var j = 0; j < frm.doc.earnings.length; j++) {
                                    // console.log(res.message[i].salary_component + " == " + frm.doc.earnings[j].salary_component);
                                    if (res.message[i].salary_component == frm.doc.earnings[j].salary_component) {
                                        found = 1;
                                        console.log('found salary comp');
                                        add_amount = res.message[i].amount;
                                    }
                                }

                                console.log(res.message[i]);
                                console.log(res.message[i].salary_component);
                                var newrow = cur_frm.add_child("mtd_earnings");
                                newrow.salary_component = res.message[i].salary_component;
                                newrow.amount = res.message[i].amount + add_amount;
                                refresh_field("mtd_earnings");
                            }
                        }
                    }
                });
                frappe.call({
                    'method': 'payslip_app.payslip_app.get_mtd',
                    'args': {
                        'employee': frm.doc.employee,
                        'posting_date': frm.doc.posting_date,
                        'earning_deduction': 'deductions'

                    },
                    'callback': function (res) {
                        console.log(res);
                        if (res.message) {

                            frm.doc.mtd_deductions = [];

                            for (var i = 0; i < res.message.length; i++) {


                                var found = 0;
                                var add_amount = 0;
                                for (var j = 0; j < frm.doc.deductions.length; j++) {
                                    // console.log(res.message[i].salary_component + " == " + frm.doc.earnings[j].salary_component);
                                    if (res.message[i].salary_component == frm.doc.deductions[j].salary_component) {
                                        found = 1;
                                        console.log('found salary comp');
                                        add_amount = res.message[i].amount;
                                    }
                                }


                                var newrow = cur_frm.add_child("mtd_deductions");
                                newrow.salary_component = res.message[i].salary_component;
                                newrow.amount = res.message[i].amount + add_amount;
                                refresh_field("mtd_deductions");
                            }
                        }
                    }
                });
            }
        }



             if(frm.doc.employee) {
                 if (frm.doc.payroll_frequency == 'Monthly') {
                     frappe.call({
                         'method': 'payslip_app.payslip_app.get_ytd',
                         'args': {
                             'employee': frm.doc.employee
                         },
                         'callback': function (res) {
                             console.log(res);
                             if (res.message) {


                                 frm.doc.ytd_earnings = [];


                                 for (var i = 0; i < res.message.length; i++) {
                                     var found = 0;
                                     var add_amount = 0;
                                     for (var j = 0; j < frm.doc.earnings.length; j++) {
                                         // console.log(res.message[i].salary_component + " == " + frm.doc.earnings[j].salary_component);
                                         if (res.message[i].salary_component == frm.doc.earnings[j].salary_component) {
                                             found = 1;
                                             console.log('found salary comp');
                                             add_amount = res.message[i].amount;
                                         }
                                     }

                                     console.log(res.message[i]);
                                     console.log(res.message[i].salary_component);
                                     var newrow = cur_frm.add_child("ytd_earnings");
                                     newrow.salary_component = res.message[i].salary_component;
                                     newrow.amount = res.message[i].amount + add_amount;
                                     refresh_field("ytd_earnings");
                                 }
                             }
                         }
                     });
                     frappe.call({
                         'method': 'payslip_app.payslip_app.get_ytd',
                         'args': {
                             'employee': frm.doc.employee,
                             'earning_deduction': 'deductions'
                         },
                         'callback': function (res) {
                             console.log(res);
                             if (res.message) {

                                 frm.doc.ytd_deductions = [];

                                 for (var i = 0; i < res.message.length; i++) {


                                     var found = 0;
                                     var add_amount = 0;
                                     for (var j = 0; j < frm.doc.deductions.length; j++) {
                                         // console.log(res.message[i].salary_component + " == " + frm.doc.earnings[j].salary_component);
                                         if (res.message[i].salary_component == frm.doc.deductions[j].salary_component) {
                                             found = 1;
                                             console.log('found salary comp');
                                             add_amount = res.message[i].amount;
                                         }
                                     }


                                     var newrow = cur_frm.add_child("ytd_deductions");
                                     newrow.salary_component = res.message[i].salary_component;
                                     newrow.amount = res.message[i].amount + add_amount;
                                     refresh_field("ytd_deductions");
                                 }
                             }
                         }
                     });

                 }
             }

     }
 });
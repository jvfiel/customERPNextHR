import frappe


#bench execute payslip_app.payslip_app.get_mtd --kwargs "{'employee':'EMP/0001'}"
@frappe.whitelist()
def get_mtd(employee,posting_date,earning_deduction="earnings"):


    # emp_doc = frappe.get_doc("Employee",employee)

    salaries = []
    for salary in frappe.db.sql("""SELECT salary_component,amount FROM `tabSalary Detail`
                                        INNER JOIN `tabSalary Slip`
                                        ON `tabSalary Slip`.name = `tabSalary Detail`.parent WHERE
                                        employee=%s and `tabSalary Detail`.parentfield=%s AND
                                        `tabSalary Slip`.posting_date >= %s"""
                                            ,(employee,earning_deduction,posting_date),as_dict=True):
        component_found = 0
        for s in salaries:
            if s['salary_component']==salary['salary_component']:
                print "component found!",salary['salary_component']
                s.update({"amount":s['amount']+salary['amount']})
                component_found = 1

        if not component_found:
            print "component not found!"
            salaries.append(salary)

    print salaries
    return salaries

@frappe.whitelist()
def get_ytd(employee,earning_deduction="earnings"):
    emp_doc = frappe.get_doc("Employee", employee)

    salaries = []
    for salary in frappe.db.sql("""SELECT salary_component,amount FROM `tabSalary Detail`
                                            INNER JOIN `tabSalary Slip`
                                            ON `tabSalary Slip`.name = `tabSalary Detail`.parent WHERE
                                            employee=%s and `tabSalary Detail`.parentfield=%s AND
                                            `tabSalary Slip`.posting_date >= %s"""
            , (employee, earning_deduction, emp_doc.date_of_joining), as_dict=True):
        component_found = 0
        for s in salaries:
            if s['salary_component'] == salary['salary_component']:
                print "component found!", salary['salary_component']
                s.update({"amount": s['amount'] + salary['amount']})
                component_found = 1

        if not component_found:
            print "component not found!"
            salaries.append(salary)

    print salaries
    return salaries
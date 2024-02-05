import React from "react"
const About = (props) => {

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12 divPadding">
                    <div className="card ">
                        <div className="card-body">
                            <p>
                                An expense app is a software application designed to help individuals and businesses track, manage, and organize their financial transactions and expenses.Making it convenient for users to record and monitor their spending in real-time. Expense apps offer a range of features and functionalities that simplify expense management, improve financial awareness, and facilitate budgeting.
                            </p>
                            <ul>
                                <li className="card-body li">
                                    Expense Tracking: The core function of an expense app is to allow users to input and categorize their expenses. This includes recording details like date, amount, payee, category (e.g., food, transportation, entertainment), and attaching receipts for reference.
                                </li>
                                <li className="card-body li">
                                    Budget Management: Expense apps often enable users to set budgets for different spending categories. The app can then provide alerts or notifications when users approach or exceed their budget limits.
                                </li>
                                <li className="card-body li">
                                    Expense Policy Compliance: In business-oriented expense apps, you may find features that help enforce expense policies and ensure that all expenses are within the company's guidelines.
                                </li>
                                
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default About
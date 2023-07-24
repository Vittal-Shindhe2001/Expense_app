const Home = (props) => {
   
    return (
        <div className="container fuild">
            <div className="row">
                <div className="col-md-6">
                <p style={{paddingTop: '150px',
    boxSizing: 'content-box'}} >An expense app is a software application designed to help individuals and businesses track, manage, and organize their financial transactions and expenses.Making it convenient for users to record and monitor their spending in real-time. Expense apps offer a range of features and functionalities that simplify expense management, improve financial awareness, and facilitate budgeting. </p>
                </div>
                <div className="col-md-4">
                    <img src='https://quickbooks.intuit.com/oidam/intuit/sbseg/en_us/Blog/Graphic/how-to-do-payroll@1x.png' alt="expense" style={{ width: "600px",height:"500px" }} />
                </div>
            </div>
        </div>
    )
}
export default Home
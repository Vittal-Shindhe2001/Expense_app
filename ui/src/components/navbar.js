import { useEffect, useState } from "react"
import { Link, Route } from "react-router-dom/cjs/react-router-dom.min"
import Home from "./Home"
import DashBoard from "./DashBoard"
import Register from "./register"
import Login from "./login"
import Setting from "./Settings"
import Account from "./Account"
import PageNotFound from "./PageNotFound"
const Navbar = (props) => {
    const [isLogin, setIsLogin] = useState(false)
    useEffect(() => {
        if (localStorage.getItem('token')) {
            setIsLogin(true)
        }
    }, [])
    return (
        <div>
            {isLogin ? <div className="container-fuild">
                <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "orange" }}>
                    <h1 className="navbar-brand"><span style={{ color: "purple" }}>EXPENSE APP</span></h1>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link className="nav-link" to='/'>Home </Link>
                            </li>
                            <li className="nav-item active">
                                <Link className="nav-link" to='/dashBoard'>DashBoard </Link>
                            </li>
                            <li className="nav-item active">
                                <Link className="nav-link" to='/account'>Account </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to='/setting'>Setting</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to='*'></Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to='/' onClick={() => {
                                    localStorage.removeItem('token')
                                    setIsLogin(false)
                                }}>LogOut</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div> :
                <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "orange" }}>
                    <h1 className="navbar-brand">EXPENSE APP</h1>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link className="nav-link" to='/'>Home </Link>
                            </li>
                            <li className="nav-item active">
                                <Link className="nav-link" to='/register'>Register </Link>
                            </li>
                            <li className="nav-item active">
                                <Link className="nav-link" to='/login'>Login </Link>
                            </li>
                        </ul>
                    </div>
                </nav>}
                {!isLogin && <>
            <Route path="/" component={Home} exact={true} />
            <Route path="/register" component={Register} />
                <Route
                    path="/login"
                    render={(props) => (
                        <Login {...props} setIsLogin={setIsLogin} />
                    )}
                /> </>}
            
            {isLogin && (
                <>
                    <Route path="/" component={Home} exact={true} />
                    <Route path="/dashBoard" component={DashBoard} />
                    <Route path="/setting" component={Setting}  />
                    <Route path="/account" render={props => <Account {...props} setIsLogin={setIsLogin} />}/>       
                    <Route path="*" component={PageNotFound}/>       
                          
                </>
            )}
        </div>
    )
}
export default Navbar

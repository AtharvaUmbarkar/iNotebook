import { Link, /*useLocation,*/ NavLink, useNavigate } from "react-router-dom";

const Navbar = (props) => {
  // let location = useLocation();
  // useEffect(() => {
  //   console.log(location.pathname);
  // },[location])
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    props.showAlert("Logout Successful", "primary")
    navigate("/login");
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">iNotebook</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                {/* <Link className={`nav-link ${location.pathname === "/home"? "active": ""}`} aria-current="page" to="/home">Home</Link> */}
                <NavLink className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} aria-current="page" to="/home">Home</NavLink>
              </li>
              <li className="nav-item">
                {/* <Link className={`nav-link ${location.pathname === "/about"? "active": ""}`} to="/about">About</Link> */}
                <NavLink className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} to="/about">About</NavLink>
              </li>
            </ul>
            {!localStorage.getItem("token") ?
              <form className="d-flex">
                <div>
                  <Link className="btn btn-success btn-sm mx-2" to="/login" role="button">Login</Link>
                  <Link className="btn btn-success btn-sm mx-2" to="/signup" role="button">Sign-Up</Link>
                </div>
              </form>
              :
              <div className="d-flex">
                <div className="container mx-2" style={{
                  color: "white",
                  border: "1.5px solid white",
                  borderRadius: "10px"
                }}>User: {localStorage.getItem("name")}</div>
                <Link className="btn btn-success btn-sm mx-2" to="/login" role="button" onClick={handleLogout}>Logout</Link>
              </div>}
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
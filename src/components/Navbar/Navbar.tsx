import { useAuth } from "../../hooks/useAuth";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import { logoutAPI } from "../../services/dac-api";


export default function Navbar() {
  const { user, logout } = useAuth();
  if (user === undefined) {
    return <>Loading</>;
  }
  if (user === null) {
    return <></>;
  }
  const handleLogout = async () => {
    await logoutAPI();
    logout();
  };

  return (
    <div className={`${styles.container}`}>
      <h1>dacademy</h1>
      {user.role == "tutor" ? (
        <>
          <Link
            to={`/class`}
            className={`${
              window.location.pathname.split("/")[1] === "class"
                ? styles["link--selected"]
                : ""
            }`}
          >
            Class
          </Link>
          <Link
            to={`/assignment`}
            className={`${
              window.location.pathname.split("/")[1] === "assignment"
                ? styles["link--selected"]
                : ""
            }`}
          >
            Assignment
          </Link>
          <Link
            to={`/student`}
            className={`${
               window.location.pathname.split("/")[1] === "student"
                ? styles["link--selected"]
                : ""
            }`}
          >
            Student
          </Link>
          <button onClick={handleLogout} className={`${styles.logout}`}>
            Logout
          </button>
        </>
      ) : (
        <>
          <Link
            to={`/class`}
            className={`${
              window.location.pathname.split("/")[1] === "class"
                ? styles["link--selected"]
                : ""
            }`}
          >
            Class
          </Link>
          <Link
            to={`/assignment`}
            className={`${
              window.location.pathname.split("/")[1] === "assignment"
                ? styles["link--selected"]
                : ""
            }`}
          >
            Assignment
          </Link>
          <button onClick={handleLogout} className={`${styles.logout}`}>
            Logout
          </button>
        </>
      )}
    </div>
  );
}

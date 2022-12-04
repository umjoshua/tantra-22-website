import { useState } from "react";
import axios from "axios";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const AdminLogin = () => {
	const navigate = useNavigate();
	const [data, setData] = useState({ username: "", password: "" });
	const [warning, setWarning] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const url = "https://cautious-waistcoat-mite.cyclic.app/login";
	// const url = 'https://tantra-prod-test-s9utur.mo4.mogenius.io/login';

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			setLoading(true);
			setWarning(false);
			const { data: res } = await axios.post(url, data);
			localStorage.setItem("token", res.token);
			navigate('/admin');
			window.location.reload();
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setWarning(true);
				setLoading(false);
			}
		}
	};

	return (
		<div className={styles.login_container}>
			<div className={styles.login_form_container}>
				<div className={styles.left}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1>Login</h1>
						<input
							type="text"
							placeholder="username"
							name="username"
							onChange={handleChange}
							value={data.username}
							required
							className={styles.input}
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className={styles.input}
						/>
						{warning && <div className={styles.error_msg}>Incorrect Username/Password</div>}
						<button type="submit" className={styles.green_btn}>
							Sign In
						</button>
						<Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
							<CircularProgress color="inherit" />
						</Backdrop>
					</form>
				</div>
			</div>
		</div>
	);
};

export default AdminLogin;
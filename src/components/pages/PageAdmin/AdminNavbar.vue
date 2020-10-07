<template>
	<div class="adminNavbar">
		<h3 class="adminTitle">Admin Panel</h3>
		<nav>
			<ul class="nav__links">
				<li>
					<router-link to="/admin/" style="color: #0088a9;"
						>Users</router-link
					>
				</li>
				<li>
					<a @click="usageCSVThisMonth"
						>Download Usage CSV (this month)</a
					>
				</li>
				<li>
					<a @click="usageCSVLastMonth"
						>Download Usage CSV (last month)</a
					>
				</li>
				<!-- <li><router-link to="/admin/">App Usage (Coming Soon)</router-link></li> -->
			</ul>
		</nav>
		<div>
			<a @click="$router.push('/')" class="cta"
				><button class="benefitSheetLink">Benefit Sheet</button></a
			>
			<a @click="logout" class="cta"><button>Logout</button></a>
		</div>
	</div>
</template>

<script>
import axios from "axios";
import moment from "moment";

export default {
	name: "AdminNavbar",
	methods: {
		logout() {
			localStorage.clear();
			sessionStorage.clear();
			this.$router.push("/login");
		},
		async testUsage() {
			try {
				const response = await axios({
					method: "get",
					url: "/api/loginLogs",
					headers: {
						authorization: `Bearer ${JSON.parse(
							localStorage.getItem("jwt")
						)}`
					}
				});
				console.log(response.data.data);
			} catch (err) {
				console.error(err);
			}
		},
		async usageCSVThisMonth() {
			try {
				const response = await axios({
					method: "get",
					url: "/api/loginLogs",
					headers: {
						authorization: `Bearer ${JSON.parse(
							localStorage.getItem("jwt")
						)}`
					}
				});

				let daysInMonthArr = [];

				// Get the amount of days from the start of the month until today
				let todayDate = moment().date();

				for (let i = 0; i < todayDate; i++) {
					let day = moment()
						.startOf("month")
						.add(i, "days")
						.format("MMM Do");
					daysInMonthArr.push(day);
				}

				let objectByEmail = {};

				response.data.data.forEach(i => {
					if (!(i.email in objectByEmail)) {
						objectByEmail[i.email] = [];
					}

					let timestampFormatted = moment
						.utc(i.createdAt)
						.subtract(5, "hours")
						.format("MMM Do");

					if (daysInMonthArr.includes(timestampFormatted)) {
						objectByEmail[i.email].push(timestampFormatted);
					}
				});

				let csvContent = "data:text/csv;charset=utf-8,\n";

				csvContent += "Email,";

				daysInMonthArr.forEach(i => {
					csvContent += `${i},`;
				});

				csvContent += "\n";

				for (const property in objectByEmail) {
					csvContent += `${property},`;

					daysInMonthArr.forEach(i => {
						if (objectByEmail[property].includes(i)) {
							csvContent += "true,";
						} else {
							csvContent += " ,";
						}
					});

					csvContent += "\n";
				}

				let encodedUri = encodeURI(csvContent);
				var link = document.createElement("a");
				link.setAttribute("href", encodedUri);
				link.setAttribute("download", "usage_reports.csv");
				document.body.appendChild(link); // Required for FF

				link.click();
			} catch (err) {
				console.log(err);
			}
		},
		async usageCSVLastMonth() {
			try {
				const response = await axios({
					method: "get",
					url: "/api/loginLogs/lastMonth",
					headers: {
						authorization: `Bearer ${JSON.parse(
							localStorage.getItem("jwt")
						)}`
					}
				});

				let daysInMonthArr = [];

				// Get the amount of days from the start of the month until today
				let todayDate = moment().date();
				let daysInLastMonth = moment(todayDate)
					.subtract(1, "months")
					.daysInMonth();

				for (let i = 0; i < daysInLastMonth; i++) {
					let day = moment()
						.startOf("month")
						.subtract(1, "months")
						.add(i, "days")
						.format("MMM Do");
					daysInMonthArr.push(day);
				}

				let objectByEmail = {};

				response.data.data.forEach(i => {
					if (!(i.email in objectByEmail)) {
						objectByEmail[i.email] = [];
					}

					let timestampFormatted = moment
						.utc(i.createdAt)
						.subtract(5, "hours")
						.format("MMM Do");

					if (daysInMonthArr.includes(timestampFormatted)) {
						objectByEmail[i.email].push(timestampFormatted);
					}
				});

				let csvContent = "data:text/csv;charset=utf-8,\n";

				csvContent += "Email,";

				daysInMonthArr.forEach(i => {
					csvContent += `${i},`;
				});

				csvContent += "\n";

				for (const property in objectByEmail) {
					csvContent += `${property},`;

					daysInMonthArr.forEach(i => {
						if (objectByEmail[property].includes(i)) {
							csvContent += "true,";
						} else {
							csvContent += " ,";
						}
					});

					csvContent += "\n";
				}

				let encodedUri = encodeURI(csvContent);
				var link = document.createElement("a");
				link.setAttribute("href", encodedUri);
				link.setAttribute("download", "usage_reports.csv");
				document.body.appendChild(link); // Required for FF

				link.click();
			} catch (err) {
				console.log(err);
			}
		},
		async usageCSVBackup() {
			try {
				const response = await axios({
					method: "get",
					url: "/api/loginLogs",
					headers: {
						authorization: `Bearer ${JSON.parse(
							localStorage.getItem("jwt")
						)}`
					}
				});
				let csvContent = "data:text/csv;charset=utf-8,\n";
				csvContent += "First Name,Last Name,Email,Date,Time\n";
				response.data.data.forEach(i => {
					let d = new Date(i.timestamp).toLocaleString("en-US", {
						timeZone: "America/Chicago"
					});
					csvContent += `${i.firstName},${i.lastName},${i.email},${d}\n`;
				});
				let encodedUri = encodeURI(csvContent);
				var link = document.createElement("a");
				link.setAttribute("href", encodedUri);
				link.setAttribute("download", "usage_reports.csv");
				document.body.appendChild(link); // Required for FF

				link.click();
			} catch (err) {
				console.log(err);
			}
		}
	}
};
</script>

<style lang="less">
.adminNavbar {
	box-sizing: border-box;
	margin: 0;
	padding: 0;
	background-color: #1f596e;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 10px 30px;
	height: 5rem;

	h3 {
		color: #edf0f1;
	}

	li,
	a,
	button {
		font-weight: 500;
		font-size: 16px;
		color: #edf0f1;
		text-decoration: none;
		cursor: pointer;
	}

	button {
		padding: 9px 25px;
		background-color: rgba(0, 136, 169, 1);
		border: none;
		border-radius: 50px;
		cursor: pointer;
		transition: all 0.3s ease 0s;

		&:hover {
			background-color: rgba(0, 136, 169, 0.8);
			transform: translateY(-3px);
			box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2);
		}

		&:active {
			transform: translateY(-1px);
			box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
		}

		&:focus {
			outline: none;
		}
	}

	.benefitSheetLink {
		margin-right: 1rem;
		background-color: white;
		color: rgba(0, 136, 169, 1);

		&:hover {
			background-color: rgba(255, 255, 255, 0.8);
		}
	}

	.nav__links {
		list-style: none;

		li {
			display: inline-block;
			padding: 0px 20px;

			a {
				transition: all 0.3s ease 0s;
			}

			a:hover {
				color: #0088a9;
			}
		}
	}
}
</style>

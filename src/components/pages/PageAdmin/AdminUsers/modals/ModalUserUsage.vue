<template>
<div id="addUserModal" class="addUserModal">
    <div class="modal-content">
        <span class="closeBtn" @click="$emit('close-modal')">&times;</span>
        <h2>{{ firstName }} {{ lastName }}</h2>
        <div v-if="loading" class="loadingSpinner">
            <i class="fas fa-spinner fa-spin"></i>
        </div>
        <div v-else>
            <div class="usersTable">
                <div>Date</div>
                <div>Type</div>
            </div>
            <div class="usersTable" v-for="report in reports" :key="report._id">
                <div>{{ report.dateAndTimeString }}</div>
                <div>{{ report.typeOfReport }}</div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios'

export default {
	name: 'ModalUserUsage',
	props: {
		_id: String,
		firstName: String,
		lastName: String
	},
	data () {
		return {
			reports: [],
			loading: true
		}
	},
	methods: {
		getReports () {
			axios({
				method: 'post',
				url: '/api/usageReports/getUsageReportsByUserId',
				headers: { authorization: 'Bearer ' + JSON.parse(localStorage.getItem('jwt')) },
				data: {
					userId: this._id
				}
			})
				.then(response => {
					this.reports = response.data.usageReports
					this.loading = false
				})
				.catch(error => {
					console.log(error)
				})
		}
	},
	mounted () {
		this.getReports()
	}
}
</script>

<style lang="less" scoped>
.addUserModal {
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0,0,0,0.5);

    .modal-content {
        background-color: #f4f4f4;
        margin: 3rem auto;
        padding: 1rem;
        width: 50%;
        box-shadow: 0 5px 8px 0 rgba(0,0,0,0.2), 0 7px 20px 0 rgba(0,0,0,0.17);

        .closeBtn {
            color: #ccc;
            float: right;
            font-size: 2rem;

            &:hover, &:focus {
                color: black;
                text-decoration: none;
                cursor: pointer;
            }
        }

        .loadingSpinner {
            text-align: center;
            font-size: 2rem;
        }

        .usersTable {
            display: grid;
            grid-template-columns: repeat(auto-fill, 50%);
            padding: 15px 10px;
            border-bottom: 1px solid black;
            text-align: center;
            align-items: center;

            &:first-of-type {
                font-weight: bold;
                cursor: pointer;
            }

            &:nth-of-type(2n) {
                background-color: #dedede;
            }

            &:nth-of-type(n+2) {
                border-left: 1px solid black;
                border-right: 1px solid black;
            }

            .actions {
                display: flex;
                justify-content: center;
            }

            .actions > i {
                cursor: pointer;
                margin: 0 2rem;
            }

            input {
                appearance: none;
                height: 1rem;
                width: 1rem;
                -webkit-appearance: none;
                -moz-appearance: none;
                -o-appearance: none;
                appearance: none;
                border: 1px solid black;
                border-radius: 4px;
                outline: none;
                transition-duration: 0.3s;
                background-color: none;
                cursor: pointer;

                &:checked {
                    border: 1px solid black;
                    background-color: #1F596E;
                }
            }
        }
    }
}
</style>

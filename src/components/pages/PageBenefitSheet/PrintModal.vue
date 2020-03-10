<template>
<div class="new-changes-modal hide-on-print">
	<form class="modal-content">
        <span class="closeBtn" @click="$emit('close-modal')">&times;</span>
        <h2>User Info to Print</h2>
        <input-field v-bind="{inputStyle: {initialInputType: 'text', label:'Guest Name', placeholder:'John Doe', meter:false}}" :value="guestInfo.guestName" v-on:value-changed="guestInfo.guestName = $event"/>
        <input-field v-bind="{inputStyle: {initialInputType: 'tel', label:'Guest Phone Number', placeholder:'(555)-555-5555', meter:false, maskValue:'(XXX) XXX-XXXX'}}" :value="guestInfo.guestNumber" v-on:value-changed="guestInfo.guestNumber = $event"/>
        <span v-if="inputError" class="error">{{ inputError }}</span>
        <button v-else @click="$emit('print', guestInfo)">PRINT</button>
	</form>
</div>
</template>

<script>
import InputField from '@/components/ui/InputField'

export default {
	name: 'NewChangesModal',
	components: { InputField },
	data() {
		return {
			guestInfo: {
				guestName: '',
				guestNumber: ''
			},
			inputError: ''
		}
	}
}
</script>

<style lang="less" scoped>
.new-changes-modal {
	position: fixed;
	z-index: 1;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	overflow: auto;
	background-color: rgba(0,0,0,0.5);

	@media print {
		display: none;
	}

	.modal-content {
		background-color: #f4f4f4;
		margin: 3rem auto;
		padding: 1rem;
		width: 50%;
		min-width: 20rem;
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

        > div {
            display: -ms-grid;
            display: grid;
            margin: 2rem 0;
        }

        p {
            font-size: .9rem;
            margin: 0;
            padding-bottom: .5rem;
            align-self: end;
            font-weight: bold;
        }

        select {
            margin: 0;
            padding: 0;
            text-indent: .5rem;
            height: 2rem;
            border: 1px solid #1F596E;
            border-radius: 5px;

            &:focus {
                outline: none;
            }
        }

        button {
            align-self: center;
            justify-self: end;
            color: white;
            background-color: #1F596E;
            border-radius: 5px;
            width: 7rem;
            height: 3.5rem;
            border: none;
            font-weight: bold;
            font-size: 20px;
            outline: none;
            cursor: pointer;
        }

        .error {
            color: red;
        }

        .msg {
            color: green;
        }
	}
}
</style>
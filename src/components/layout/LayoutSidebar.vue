<!--

This Layout is inspired by a Pen on CodePen. The MIT License that applies to all public Pens is included below.

Copyright (c) 2020 - rajeshdn - https://codepen.io/cool_lazyboy/pen/LKzZNe

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without restriction,
 including without limitation the rights to use, copy, modify,
merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall
be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
DEALINGS IN THE SOFTWARE.

-->

<template>
<div class="sidebar">
	<div class="username">
		<div class="userInitials">
			<span>{{userInfo.email.slice(0,2).toUpperCase()}}</span>
		</div>
		{{userInfo.email}}
	</div>
	<div class="sidebar-links">
		<router-link to="/"><i class="fas fa-home"></i>Benefit Sheet</router-link>
		<router-link v-if="$store.state.optionsType.optionOne === 'consumer'" to="/options/consumer/optionOne"><i class="fas fa-dice-one"></i>Option 1</router-link>
		<router-link v-else-if="$store.state.optionsType.optionOne === 'business'" to="/options/business/optionOne"><i class="fas fa-dice-one"></i>Option 1</router-link>
		<router-link v-if="$store.state.optionsType.optionTwo === 'consumer'" to="/options/consumer/optionTwo"><i class="fas fa-dice-two"></i>Option 2</router-link>
		<router-link v-else-if="$store.state.optionsType.optionTwo === 'business'" to="/options/business/optionTwo"><i class="fas fa-dice-two"></i>Option 2</router-link>
		<router-link to="/admin" v-if="$store.state.userInfo.admin"><i class="fas fa-users-cog"></i>Admin Panel</router-link>
		<router-link to="/changelog"><i class="fas fa-clipboard"></i>Changelog <span class="new-changes"><i class="fas fa-exclamation-triangle"></i> New Changes!</span></router-link>
	</div>
	<div class="footer">
		<a @click="logout">Logout</a>
		<router-link to="/changelog">Verison: 2.0.0</router-link>
	</div>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
	name: 'LayoutSidebar',
	computed: {
		...mapState([
			'userInfo',
			'webappVersion'
		])
	},
	methods: {
		...mapActions([
			'resetAll'
		]),
		logout: async function () {
			await this.resetAll()
			sessionStorage.clear()
			localStorage.clear()
			this.$router.push('/login')
		}
	}
}
</script>

<style lang="less" scoped>
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	list-style: none;
	text-decoration: none;

	@media print {
		display: none;
	}
}

.sidebar {
	width: 100%;
	height: 100%;
	background: rgba(0,0,0,.4);
	padding: 30px 0px;
	position: relative;

	@media print {
		display: none;
	}

	h2 {
		color: #fff;
		text-transform: uppercase;
		text-align: center;
		margin-bottom: 30px;
	}

	.username {
		display: grid;
		color: white;
		text-align: center;
		align-self: center;
		padding-bottom: 3%;
		margin-bottom: .5rem;
		font-size: .9rem;
		// font-family: 'Josefin Sans', sans-serif;

		.userInitials {
			display: grid;
			align-self: center;
			justify-self: center;
			color: white;
			border: 1px solid white;
			border-radius: 5px;
			padding: .5rem;
			margin-bottom: .75rem;

			span {
				align-self: center;
				justify-self: center;
				font-size: 2rem;
				font-family: 'Montserrat', sans-serif;
			}
		}
	}

	.sidebar-links {
		display: flex;
		flex-direction: column;
		color: white;

		a {
			color: white;
			padding: 15px;
			border-bottom: 1px solid #bdb8d7;
			border-bottom: 1px solid rgba(0,0,0,0.05);
			border-top: 1px solid rgba(255,255,255,0.05);
			cursor: pointer;

			.fas {
				width: 2rem;
			}

			&:hover, &.router-link-exact-active {
				background-color: rgba(0,0,0,.2);
			}
		}

		.new-changes {
			color: yellow;
			font-size: 12px;
			// letter-spacing: 1.2;
			margin-left: 1rem;

			i {
				width: 1rem;
			}
		}
	}

	.footer {
		position: absolute;
		display: flex;
		justify-content: space-between;
		bottom: .4rem;
		padding: 0 .65rem;
		width: 100%;
		font-size: 1rem;

		a {
			color: white;
			cursor: pointer;
			text-decoration: underline;
		}
	}
}
</style>

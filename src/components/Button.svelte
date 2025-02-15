<script>
	export let text
	export let clickedText
	export let onclick

	let timeout

	let currentText = text

	function clicked() {
		clearTimeout(timeout)
		timeout = setTimeout(() => (currentText = text), 1000)

		currentText = clickedText
		onclick()
	}
</script>

<div>
	<button on:click={clicked}>
		<span>{currentText}</span>
	</button>
</div>

<style>
	button:hover {
		color: #ffffff;
		box-shadow: none;
		background-color: #a24fea;
	}
	button {
		width: 100%;
		background-color: rgb(68, 235, 153);
		color: rgb(0, 0, 0);
		padding: 10px 16px;
		cursor: pointer;
		transition:
			background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
			color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
			box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
		border-radius: 8px;
		border: none;
	}
	span {
		width: auto;
		font-size: 14px;
		font-style: normal;
		font-family: "SB Sans Display", Helvetica, sans-serif;
		font-weight: 400;
		line-height: 20px;
	}
	div {
		display: flex;
		margin-top: 24px;
		flex-direction: row;
		justify-content: flex-end;
	}
</style>

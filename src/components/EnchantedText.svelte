<script>
	let { text, dataset } = $props()

	let root

	$effect(() => {
		Object.entries(dataset).forEach(([k, v]) => root.dataset[k] = v)
	});
</script>

<p bind:this={root} class="enchanted-text">{text}</p>

<style>
	@keyframes enchantment {
		0% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
		100% {
			background-position: 0% 50%;
		}
	}

	.enchanted-text {
		font-size: 24px;
		font-weight: bold;
		font-family: "Minecraft", sans-serif;
		background: linear-gradient(90deg, #8649c5, #4b0082, #3498db, #8649c5);
		background-size: 300% 300%;
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		animation: enchantment 7s infinite linear;
		text-shadow:
			0px 0px 10px rgba(120, 0, 255, 0.8),
			0px 0px 20px rgba(50, 50, 255, 0.5);
	}
</style>

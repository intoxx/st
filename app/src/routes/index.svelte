<script>
	import logo from './borat-great-success.png';

	// Endpoint body output automatically feeds the props
	export let title;
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<div class="flex h-screen">
	<img alt="borat great success" src={logo} class="m-auto" />
</div>

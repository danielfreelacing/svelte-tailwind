<script lang="ts">
	import * as Tabs from '$lib/components/shadcn/ui/tabs/index';
</script>

<div class="w-full p-2">
	<Tabs.Root value="account" class="w-[400px]">
		<Tabs.List>
			<Tabs.Trigger value="account">Account</Tabs.Trigger>
			<Tabs.Trigger value="password">Password</Tabs.Trigger>
		</Tabs.List>
		<Tabs.Content value="account">Make changes to your account here.</Tabs.Content>
		<Tabs.Content value="password">Change your password here.</Tabs.Content>
	</Tabs.Root>
</div>

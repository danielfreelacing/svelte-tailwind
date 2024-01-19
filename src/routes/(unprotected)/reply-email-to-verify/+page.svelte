<script lang="ts">
	import { page } from '$app/stores';
	import LogoText from '$lib/icons/logo_text_red.svg';


	const email = $page.url.searchParams.get('email')

console.log("sending to email:", email)
</script>

<div class="  px-4 sm:p-0 container mx-auto">
	<div class="  pb-[538px] w-[343px] sm:w-[600px] h-[1024px] mx-auto">
		<div class="py-[80px] mx-auto bg-white flex-col justify-start items-start gap-16 sm:gap-[286px] inline-flex">
			<div class="w-[92px] h-8 relative">
				<img src={LogoText} alt="logo icon" />
			</div>
			<div class="self-stretch h-[88px] flex-col justify-start items-start gap-10 inline-flex">
				<div class="self-stretch h-[88px] flex-col justify-start items-start gap-4 flex">
					<div
						class="self-stretch text-zinc-900 text-2xl sm:text-[40px] font-semibold font-['Poppins'] leading-10"
					>
						Please verify your email
					</div>
					<div class="self-stretch">
						<span
							class="text-zinc-900 text-base sm:text-xl font-normal font-['Poppins'] leading-loose"
							>We’ve sent a verification link to
						</span><span
							class="text-text-text-on-surface-link text-base sm:text-xl font-normal font-['Poppins'] leading-loose"
							>{email}</span
						>
					</div>
				</div>
			</div> 
		</div>
	</div>
</div>

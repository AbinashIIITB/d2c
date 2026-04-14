import Image from "next/image"

export function LogoShowcase() {
  return (
    <section className="py-12 md:py-20 bg-d2c-navy relative overflow-hidden flex justify-center items-center">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="content-boundary relative z-10 flex flex-col items-center max-w-4xl mx-auto">
        <div className="relative w-full max-w-[600px] aspect-[1024/534] mix-blend-screen opacity-90">
          <Image
            src="/logo-footer.png"
            alt="Logo Showcase"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </section>
  )
}

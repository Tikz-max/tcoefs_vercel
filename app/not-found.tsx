import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ButtonLink, Contours } from "@/components/site/ui";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="grain relative overflow-hidden bg-forest text-white">
        <Contours
          seed={6}
          className="absolute -left-[20%] -top-[20%] h-[150%] w-[100%] text-white/[0.06]"
        />
        <div className="shell relative flex min-h-[80svh] flex-col justify-end pb-20 pt-40">
          <p className="eyebrow flex items-center gap-3 text-sage">
            <span aria-hidden="true" className="h-px w-8 bg-wheat" />
            Error 404
          </p>
          <h1 className="display display-hero mt-8 max-w-[12ch]">
            This page has gone <em>to seed.</em>
          </h1>
          <p className="lede mt-8 max-w-md text-white/70">
            The page you are looking for has moved or no longer exists.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="/" variant="wheat">
              Back to home
            </ButtonLink>
            <ButtonLink href="/contact" variant="outline-light">
              Contact the Centre
            </ButtonLink>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

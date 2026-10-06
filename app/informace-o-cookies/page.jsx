import Link from "next/link";

export const metadata = {
  title: "Informace o analytických cookies",
  description: "Jak na tomto webu používáme analytické cookies a Google Analytics 4 a jak můžete změnit svůj souhlas.",
};

const linkClass = "underline underline-offset-2 hover:text-neutral-600";
const sectionClass = "space-y-4 border-t border-neutral-200 pt-8";

export default function InformaceOCookies() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-12 text-neutral-900 sm:py-20">
      <Link href="/" className={linkClass}>← Zpět na web</Link>
      <h1 className="mt-10 text-3xl font-semibold tracking-tight sm:text-4xl">Informace o analytických cookies</h1>
      <p className="mt-5 text-base leading-7 text-neutral-700">Na této stránce vysvětlujeme měření návštěvnosti pomocí Google Analytics 4. Analytiku spouštíme jen s vaším souhlasem.</p>
      <div className="mt-12 space-y-10 leading-7">
        <section className={sectionClass}>
          <h2 className="text-xl font-semibold">Kdo s údaji pracuje</h2>
          <p>Správcem údajů získaných při měření návštěvnosti tohoto webu je <strong>KOKOSPORT s.r.o.</strong>, Kokořínský Důl 41, 277 23 Kokořín, IČO 03662993. S dotazy k soukromí se můžete obrátit na <a className={linkClass} href="mailto:info@harasov.eu">info@harasov.eu</a>.</p>
        </section>
        <section className={sectionClass}>
          <h2 className="text-xl font-semibold">K čemu měření slouží</h2>
          <p>Google Analytics 4 používáme k přehledu o návštěvnosti: zjišťujeme například, které stránky lidé navštěvují, odkud na web přicházejí a jaké části webu používají. U některých webů měříme také kliknutí na kontakt nebo práci s poptávkou. Obsah zpráv ve formuláři není účelem analytického měření. Každý z našich osmi webů má v Google Analytics samostatnou službu.</p>
          <p>Analytické měření spouštíme <strong>až po vašem souhlasu</strong>. Pokud analytiku odmítnete nebo volbu neprovedete, značku GA4 nenačteme. Web můžete používat i bez analytického měření. Právním základem použití analytických cookies a navazujícího měření je váš souhlas.</p>
        </section>
        <section className={sectionClass}>
          <h2 className="text-xl font-semibold">Co se ukládá a komu se údaje předávají</h2>
          <p>Po souhlasu používá Google Analytics zejména tyto cookies:</p>
          <div className="overflow-x-auto"><table className="w-full border-collapse text-left text-sm"><thead><tr><th className="border-b border-neutral-300 p-2">Název</th><th className="border-b border-neutral-300 p-2">Účel</th><th className="border-b border-neutral-300 p-2">Výchozí platnost</th></tr></thead><tbody><tr><td className="border-b border-neutral-200 p-2">_ga</td><td className="border-b border-neutral-200 p-2">Rozlišení návštěvníků</td><td className="border-b border-neutral-200 p-2">2 roky</td></tr><tr><td className="border-b border-neutral-200 p-2">_ga_&lt;ID&gt;</td><td className="border-b border-neutral-200 p-2">Zachování stavu návštěvy</td><td className="border-b border-neutral-200 p-2">2 roky</td></tr></tbody></table></div>
          <p>Skutečnou dobu může zkrátit nastavení prohlížeče. Volbu, zda jste analytiku povolili nebo odmítli, uchováváme v místním úložišti prohlížeče. Souhlas platí 12 měsíců, odmítnutí 6 měsíců. Poté se na volbu zeptáme znovu.</p>
          <p>Poskytovatelem analytické služby je <strong>Google Ireland Limited</strong>. Google při jejím provozu zpracovává informace o návštěvě, zařízení a prohlížeči a může pracovat také s IP adresou a přibližnou polohou. Zpracování může zahrnovat předání údajů mimo Evropský hospodářský prostor. Další informace najdete v <a className={linkClass} href="https://policies.google.com/technologies/partner-sites?hl=cs">popisu zpracování údajů od Googlu</a> a v <a className={linkClass} href="https://business.safety.google/adsdatatransfers/">informacích o mezinárodních přenosech</a>.</p>
          <p>Ve všech osmi službách Google Analytics je nastaveno uchování detailních dat událostí na <strong>2 měsíce</strong> a údajů o uživatelích na <strong>14 měsíců</strong>. Toto nastavení se netýká většiny souhrnných přehledů. Doba uložení cookies v prohlížeči je odlišná od doby uchování údajů ve službě Analytics.</p>
        </section>
        <section className={sectionClass}>
          <h2 className="text-xl font-semibold">Jak změnit volbu a uplatnit svá práva</h2>
          <p>Volbu můžete kdykoli změnit přes odkaz <strong>Nastavení cookies</strong> na webu. Po odvolání souhlasu zastavíme další analytické měření v tomto prohlížeči a odstraníme dostupné analytické cookies. Odvolání nemění zákonnost zpracování, které proběhlo před ním.</p>
          <p>V rozsahu, který se na konkrétní zpracování vztahuje, můžete požádat o přístup k údajům, opravu, výmaz, omezení zpracování nebo přenositelnost. Napište nám na <a className={linkClass} href="mailto:info@harasov.eu">info@harasov.eu</a>. Stížnost můžete podat u <a className={linkClass} href="https://uoou.gov.cz/">Úřadu pro ochranu osobních údajů</a>.</p>
        </section>
      </div>
    </main>
  );
}

# Glossy Place — zasady projektu

> Status: wersja robocza. Sekcje oznaczone **[DO UZUPEŁNIENIA]** czekają na odpowiedzi klienta.
> Ten plik jest źródłem prawdy dla decyzji technicznych i biznesowych. Aktualizujemy go, nie zaczynamy nowego.

## 1. Co to za projekt

- Sklep e-commerce premium dla marki **Glossy Place** — ręcznie robione bransoletki czakrowe.
- Zawiera blog.
- Rynek: **UK** (język angielski, waluta **GBP**).
- Projekt wchodzi też do portfolio agencji — ma wyglądać i działać na najwyższym poziomie.
- Start: **do 20 produktów**, każdy produkt to osobna, prosta pozycja **bez wariantów** (rozmiar/kolor).

## 2. Zasady współpracy

- **Ja (Marcin) piszę kod. Claude pełni rolę mentora**: tłumaczy, doradza architekturę, robi review, pomaga debugować.
- Claude nie generuje gotowych plików z kodem, chyba że wyraźnie o to poproszę.
- Jestem w połowie kursu na Scrimbie — wyjaśnienia mają być konkretne, bez zakładania wiedzy, której jeszcze nie mam.

## 3. Stack techniczny

| Warstwa | Wybór | Uwagi |
|---|---|---|
| Framework strony | **Astro** | Statyczne strony, minimalny JS wysyłany do przeglądarki — kluczowe pod Core Web Vitals |
| Stylowanie | **CSS** (vanilla) | Bez frameworków CSS typu Tailwind/Bootstrap, chyba że ustalimy inaczej |
| Interaktywność | **Vanilla JS** | Tylko tam, gdzie Astro tego wymaga (islands) |
| Animacje | **GSAP** (opcjonalnie) | Tylko jeśli poprawia odczucie "premium", nie na siłę |
| CMS | **Sanity** | Treść produktów i bloga |
| Płatności | **Stripe Checkout (hosted)** | Strona płatności nie musi wyglądać jak część sklepu — wybieramy prostszą, szybszą opcję zamiast custom Stripe Elements |
| Hosting | **Netlify** | |

## 4. Panel klienta (odpowiednik "WordPressa")

- Klient dostaje dostęp do **Sanity Studio** ze **schematem zablokowanym pod treść**.
- Może edytować: zdjęcia, opis, cenę, dostępność produktu, treści na blogu.
- **Nie może** ruszać layoutu, struktury strony ani komponentów — to kontrolujemy w kodzie, nie w CMS.

## 5. Produkty

- Każda bransoletka = osobny, prosty produkt (bez wariantów rozmiaru/koloru na start).
- Struktura pojedynczego produktu (do potwierdzenia z Sanity schema): nazwa, opis, cena, zdjęcia, kamienie/materiały, przypisana czakra, znaczenie/symbolika.
- Unikatowość sztuk i częstotliwość dodawania nowych produktów — **[DO UZUPEŁNIENIA od klienta]**.

## 6. Płatności i podatki

- **Sklep nie jest zarejestrowany jako VAT payer** — ceny to ceny końcowe, bez rozbijania na netto/VAT w checkout.
- Próg rejestracji VAT w UK: £90 000 obrotu / 12 miesięcy. Jeśli zostanie przekroczony w przyszłości, dodanie Stripe Tax nie wymaga przebudowy architektury — nie projektujemy tego teraz na zapas.
- Waluta: GBP.

## 7. Wysyłka i zwroty — [DO UZUPEŁNIENIA od klienta]

- Kraj wysyłki, kurier, koszt, czas realizacji.
- Zasady zwrotów (min. ustawowe 14 dni w UK — Consumer Contracts Regulations).

## 8. Blog — [DO UZUPEŁNIENIA od klienta]

- Tematyka, częstotliwość publikacji, kto pisze treści.

## 9. Dane prawne / kontakt — [DO UZUPEŁNIENIA od klienta]

- Forma prawna działalności, adres do korespondencji (wymagany prawnie w UK), email, telefon, social media.
- Strony wymagane prawnie: regulamin (Terms), polityka prywatności, polityka zwrotów, zgody cookies.

## 10. Wymagania niefunkcjonalne

- **Core Web Vitals są priorytetem** — kod ma być lekki, czytelny, szybki.
- Minimalizm wizualny — "premium minimal", nie przeładowany.
- Dostępność (a11y) na rozsądnym poziomie — to też wizytówka jakości w portfolio.
- SEO: podstawy pod sklep i blog (meta tagi, sitemap, dane strukturalne produktów) — do rozwinięcia w osobnej sekcji, gdy ruszymy z implementacją.

## 11. Otwarte pytania / do ustalenia później

- Domena, dostępność brand assets (logo, kolory, fonty).
- Newsletter / zbieranie maili.
- Zdjęcia produktowe — czy są gotowe, czy trzeba zaplanować sesję.
- Warianty produktów w przyszłości (obecnie: brak).

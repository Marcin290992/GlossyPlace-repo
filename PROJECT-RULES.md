# Glossy Place — zasady projektu

> Status: wersja robocza. Sekcje oznaczone **[DO UZUPEŁNIENIA]** czekają na odpowiedzi klienta.
> Ten plik jest źródłem prawdy dla decyzji technicznych i biznesowych. Aktualizujemy go, nie zaczynamy nowego.

## 1. Co to za projekt

- Sklep e-commerce premium dla marki **Glossy Place** — ręcznie robione bransoletki czakrowe.
- Zawiera blog.
- Rynek: **UK** (język angielski, waluta **GBP**).
- Projekt wchodzi też do portfolio agencji — ma wyglądać i działać na najwyższym poziomie.
- Start: **do 20 produktów**, każdy produkt to osobna, prosta pozycja **bez wariantów** (rozmiar/kolor).
- Kategorie produktowe: **Bracelets, Necklaces, Rings** (rozszerzone o Necklaces/Rings względem pierwotnego "same bransoletki" — potwierdzone 2026-07-29). Segmentacja Women's/Men's/Kids' oraz Chakra Dictionary/Stone Guide z projektu Figma — **jeszcze nie potwierdzone**, traktować jako otwarte.

## 2. Zasady współpracy

- **Domyślnie: Ja (Marcin) piszę kod. Claude pełni rolę mentora**: tłumaczy, doradza architekturę, robi review, pomaga debugować.
- Claude nie generuje gotowych plików z kodem, chyba że wyraźnie o to poproszę.
- **[TYMCZASOWO od 2026-07-29]**: z powodu presji czasowej Claude pisze kod bezpośrednio. Wracamy do domyślnego trybu (ja piszę) jak dam znać.
- Jestem w połowie kursu na Scrimbie — wyjaśnienia mają być konkretne, bez zakładania wiedzy, której jeszcze nie mam.

## 3. Stack techniczny

| Warstwa | Wybór | Uwagi |
|---|---|---|
| Framework strony | **Astro** | Statyczne strony, minimalny JS wysyłany do przeglądarki — kluczowe pod Core Web Vitals |
| Stylowanie | **CSS** (vanilla) | Bez frameworków CSS typu Tailwind/Bootstrap, chyba że ustalimy inaczej |
| Interaktywność | **Vanilla JS** | Tylko tam, gdzie Astro tego wymaga (islands) |
| Animacje | **GSAP** (opcjonalnie, zainstalowany) | Tylko jeśli poprawia odczucie "premium", nie na siłę |
| CMS | **Sanity** | Treść produktów i bloga |
| Płatności | **Stripe Checkout (hosted)** | Strona płatności nie musi wyglądać jak część sklepu — wybieramy prostszą, szybszą opcję zamiast custom Stripe Elements |
| Hosting | **Netlify** | |
| Slidery/karuzele | **Swiper.js** | Użytkownik ma licencję (Swiper Element/Premium) |

## 3a. Funkcje odrzucone / świadomie pominięte

- **Konta klientów (auth) i Supabase** — rozważone i **odrzucone na ten moment**. Powód: brak realnej potrzeby biznesowej (nie ma programu lojalnościowego), a konta wymagałyby SSR w Astro (zamiast statycznych stron), własnego systemu logowania, powiązania Stripe Customer z kontem i realnych obowiązków RODO (prawo do usunięcia danych) — nieproporcjonalny narzut względem 20-produktowego sklepu na start. Można wrócić do tego, jeśli pojawi się konkretna potrzeba biznesowa.
- **Wishlist** — realizowana bez backendu, w **`localStorage`** (zapamiętywanie ulubionych produktów lokalnie w przeglądarce, bez logowania). Nie synchronizuje się między urządzeniami — akceptowalne przy tej skali sklepu.
- **Gwiazdki / recenzje produktów** — realizowane przez **Sanity** (nowy typ dokumentu, zgłoszenia klientów zapisywane przez małą funkcję serverless z sekretnym tokenem zapisu), moderowane w tym samym Sanity Studio, którego klient już używa do produktów/bloga. Nie wymaga nowego serwisu ani kont użytkowników.
- **Snipcart / gotowy koszyk-jako-usługa** — odrzucone. Dokłada ~2% prowizji **ponad** prowizję Stripe (razem ~3.5–5.25% + 20p zamiast ~1.5–3.25% + 20p) i dodatkowy JS na każdej stronie (uderza w Core Web Vitals). Koszyk robimy sami, patrz niżej.

### Koszyk — model B (potwierdzone 2026-08-04, skorygowane po ustaleniu modelu produkcji 2026-08-04)

- Koszyk lokalny w **`localStorage`** (spójnie z wishlist) — dodawanie/usuwanie produktów, mini-cart (panel wysuwany) lub strona `/cart`, bez logowania.
- Przy kliknięciu "Checkout" jedna serverless function tworzy **jedną Stripe Checkout Session z wieloma line items** (wszystkie produkty z koszyka naraz, jedna wysyłka).
- Ilości nie są obsługiwane w klasycznym sensie (na razie max 1 sztuka danego wzoru w koszyku na klienta).
- **Ryzyko "podwójnej sprzedaży" w dużej mierze nieaktualne** — patrz sekcja 5, produkty są robione na zamówienie, nie ze stałego stanu magazynowego, więc więcej niż jedna osoba może zamówić ten sam wzór. Function przy tworzeniu Checkout Session powinna wciąż sprawdzić pole `available` w Sanity (czy dany wzór jest aktualnie przyjmowany do zamówień), ale to prostszy, ręcznie ustawiany flag, nie automatyczny mechanizm "sold out po sprzedaży".
- Odrzucony alternatywny model: "Buy now" bez koszyka (1 produkt = 1 osobna transakcja) — prostszy technicznie, ale gorszy UX przy zakupie kilku produktów naraz (np. prezenty), więc niewybrany mimo prostoty.

## 4. Panel klienta (odpowiednik "WordPressa")

- Klient dostaje dostęp do **Sanity Studio** ze **schematem zablokowanym pod treść**.
- Może edytować: zdjęcia, opis, cenę, dostępność produktu, treści na blogu.
- **Nie może** ruszać layoutu, struktury strony ani komponentów — to kontrolujemy w kodzie, nie w CMS.

## 5. Produkty

- Każda bransoletka = osobny, prosty produkt (bez wariantów rozmiaru/koloru na start).
- Struktura pojedynczego produktu (do potwierdzenia z Sanity schema): nazwa, opis, cena, zdjęcia, kamienie/materiały, przypisana czakra, znaczenie/symbolika.
- **Model produkcji: na zamówienie (potwierdzone 2026-08-04)** — produkty nie są gotowym stanem magazynowym (nie "1 sztuka i koniec"). Klientka wykonuje bransoletkę dopiero po złożeniu zamówienia. Konsekwencje:
  - Ten sam wzór może zamówić więcej niż jedna osoba — nie ma ryzyka sprzedania "tej samej unikatowej sztuki" dwa razy, bo każde zamówienie to osobna produkcja.
  - Zdjęcie produktu to przykładowy egzemplarz — gotowa sztuka może się nieznacznie różnić (naturalne wzory kamienia, ręczna robota). Stąd notka o tym na stronie produktu.
  - Pole dostępności produktu (`available`) oznacza teraz "czy aktualnie przyjmujemy zamówienia na ten wzór" (np. wstrzymane z powodu braku materiału albo zbyt dużej liczby zamówień w kolejce), a nie "czy jest na stanie". Etykieta na stronie produktu: "Made to order", nie "only 1 available".
  - Otwarte na przyszłość: czy jest limit czasu realizacji (np. "ships within 2 weeks") — do ustalenia razem z sekcją 7 (wysyłka).

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
- **Zero `border-radius` w całym UI (potwierdzone 2026-08-04)** — wszystkie elementy mają ostre rogi (karty, przyciski, zdjęcia, overlaye). Dotyczy to również sytuacji, gdy projekt w Figmie pokazuje zaokrąglone rogi (np. karty kategorii, karty produktów w "Discover Collection", karta z tekstem na bannerach kolekcji) — w takich przypadkach świadomie odstępujemy od Figmy na rzecz spójności z resztą strony. Przy implementacji nowych sekcji z Figmy najpierw usuwać `border-radius`/`rounded-*`, nie kopiować go z referencyjnego kodu.
- Dostępność (a11y) na rozsądnym poziomie — to też wizytówka jakości w portfolio.
- SEO: podstawy pod sklep i blog (meta tagi, sitemap, dane strukturalne produktów) — do rozwinięcia w osobnej sekcji, gdy ruszymy z implementacją.

## 11. Otwarte pytania / do ustalenia później

- Domena, dostępność brand assets (logo, kolory, fonty).
- ~~Newsletter / zbieranie maili~~ — **usługa: Sender.net (potwierdzone 2026-08-04)**. Formularz na stronie głównej jest już zbudowany (prawdziwy `<form>`, natywna walidacja email), ale konto/formularz w Sender jeszcze nie istnieje — `SENDER_FORM_ACTION` w `src/components/Newsletter.astro` czeka na realny action URL z panelu Sendera (Forms → embed).
- Zdjęcia produktowe — czy są gotowe, czy trzeba zaplanować sesję.
- Warianty produktów w przyszłości (obecnie: brak).

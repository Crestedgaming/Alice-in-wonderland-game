/* Syfte med rummet

Fånga katten 3 eller 5 gånger i rad genom att klicka på den när den dyker upp på skärmen. */ 

/* Tillgänglighet 

- Kunna välja olika hastigheter - lätt, medium, svår - som påverkar hur snabbt katten dyker upp och försvinner.
- Visuella och ljudindikationer när katten dyker upp och när den fångas.
- Kunna fånga katten genom att trycka på en specifik tangent på tagentbordet. Katten alltid i fokus. 
- Katten har en tydlig kontrast mot bakgrunden för att underlätta synlighet.
- Komma på ett poängsystem, med svårare nivåer som ger mer poäng. Poängen visas tydligt på skärmen.


när katten dyker upp:
    visa katten
    aktivera knappen "Fokusera katten"

när spelaren klickar "Fokusera katten":
    sätt fokus på katten

när spelaren trycker Enter på katten:
    registrera träff 

    Eller 
    när spelaren klickar på katten:
    registrera träff

/* Syfte med rummet
Fånga katten 3 eller 5 gånger i rad.
Om rummet klaras: spelaren får en bokstav och går vidare.
*/

/*START

1. INITIERA
   antalTräffarFörVinst = 3 eller 5
   antalTräffar = 0
   poäng = 0
   running = false
   paused = false
   speed = "medium"
   earnedLetter = "A"

2. SÄTT TID
   om speed == "lätt":   timeVisible = 2000 ms
   om speed == "medium": timeVisible = 1200 ms
   om speed == "svår":   timeVisible = 700 ms

3. STARTA SPEL
   när spelaren klickar Start:
      running = true
      paused = false
      kör showCatLoop()

4. FUNKTION showCatLoop()
   om paused == true: return
   visa katten
   spela ljud + visa visuell signal
   vänta timeVisible
   göm katten
   om antalTräffar < antalTräffarFörVinst:
       vänta kort paus
       showCatLoop() igen
   annars:
       avsluta spelet

5. FOKUSERA KATTEN MED SPACE
   när spelaren trycker Space (och katten är synlig):
       sätt fokus på katten

6. NÄR SPELAREN FÅNGAR KATTEN
   vid klick på katten ELLER Enter på katten:
       öka antalet träffar med 1
       poäng = poäng + beräknaPoäng(speed, reaktionstid)
       visa text "Du fångade katten!" (aria-live)
       göm katten
       om antalTräffar == antalTräffarFörVinst:
           avsluta spelet
           ge bokstav = earnedLetter
           visa "Du fick bokstaven: A"
           aktivera "Gå vidare"

7. PAUS / FORTSÄTT
   när spelaren klickar Paus:
       paused = true
       stoppa timer

   när spelaren klickar Fortsätt:
       paused = false
       showCatLoop()

SLUT*/ 








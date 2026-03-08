const fs = require('fs');
const path = require('path');

const htmlTemplate = `<!DOCTYPE html>
<html lang="{{LANG}}" dir="ltr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">
    <title>{{TITLE_SEO}}</title>
    <meta name="description" content="{{DESC_SEO}}">
    <meta name="google" content="notranslate">

    <link rel="alternate" hreflang="fr" href="{{URL_BASE}}/extrait.html" />
    <link rel="alternate" hreflang="en" href="{{URL_BASE}}/extrait-en.html" />
    <link rel="alternate" hreflang="es" href="{{URL_BASE}}/extrait-es.html" />
    <link rel="alternate" hreflang="x-default" href="{{URL_BASE}}/extrait.html" />

    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Lora:ital,wght@0,400;0,500;1,400&family=Montserrat:wght@300;400;500;600&display=swap" rel="stylesheet">
    
    <style>
        :root {
            --bg-color: #f9f6f0; /* Couleur crème riche */
            --text-color: #2c2b29; /* Noir très légèrement chaud pour le confort */
            --font-reading: 'Lora', serif;
            --font-display: 'Playfair Display', serif;
        }

        body {
            background-color: #f7f1e3; /* Beige légèrement plus vieilli */
            background-image: 
                /* 1. Assombrissement très organique sur les bords (style vieux bouquin) */
                radial-gradient(ellipse at center, transparent 30%, rgba(139, 115, 85, 0.08) 100%),
                /* 2. Micro-taches et variations de papier (marbrure monochrome) */
                url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paper'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.02' numOctaves='4' result='noise'/%3E%3CfeColorMatrix type='saturate' values='0' result='monoNoise'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23paper)' opacity='0.08'/%3E%3C/svg%3E"),
                /* 3. Grain fin régulier de la fibre de papier (monochrome) */
                url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='grain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23grain)' opacity='0.06'/%3E%3C/svg%3E");
            color: var(--text-color);
            font-family: var(--font-reading);
            line-height: 1.8;
            font-size: 1.15rem;
            margin: 0;
            padding: 0;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }

        .reader-header {
            position: sticky;
            top: 0;
            background: rgba(247, 241, 227, 0.92); /* Teinte assortie au parchemin avec forte translucidité */
            backdrop-filter: blur(12px);
            padding: 15px 5%;
            border-bottom: 1px solid rgba(0,0,0,0.05);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 100;
        }

        /* Flèche de retour PWA Officielle */
        .back-hub-btn {
            position: fixed;
            top: 20px;
            left: 20px;
            z-index: 1000;
            width: 45px;
            height: 45px;
            background: rgba(10, 10, 10, 0.6);
            border: 1px solid rgba(212, 162, 58, 0.3);
            backdrop-filter: blur(10px);
            border-radius: 50%;
            display: none !important; /* ONLY VIA PWA */
            align-items: center;
            justify-content: center;
            color: #d4af37;
            text-decoration: none !important;
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        }
        
        .back-hub-btn svg {
            width: 20px;
            height: 20px;
            transition: transform 0.4s ease;
        }

        @media (hover: hover) {
            .back-hub-btn:hover {
                background: rgba(212, 162, 58, 0.15);
                border-color: #d4af37;
                transform: scale(1.1);
                box-shadow: 0 15px 40px rgba(212, 162, 58, 0.2);
            }
            .back-hub-btn:hover svg {
                transform: translateX(-3px);
            }
        }
        
        @media (display-mode: standalone) {
            .back-hub-btn { display: flex !important; }
        }
        
        .is-pwa .back-hub-btn { display: flex !important; }



        .reader-title {
            font-family: var(--font-display);
            font-size: 1.1rem;
            font-style: italic;
            color: #666;
            margin: 0;
        }

    

        .reader-container {
            max-width: 680px;
            margin: 60px auto;
            padding: 0 25px;
        }

        h1.chapter-title {
            font-family: var(--font-display);
            font-size: 2.5rem;
            text-align: center;
            margin-bottom: 50px;
            font-weight: 600;
            color: #1a1a1a;
        }

        p {
            margin-bottom: 1.5em;
            text-align: justify;
            hyphens: auto;
        }

        .reader-container p:first-of-type::first-letter {
            font-family: var(--font-display);
            font-size: 3.5rem;
            float: left;
            line-height: 0.8;
            margin-right: 8px;
            margin-top: 4px;
            color: #d4af37;
        }

        .reader-footer {
            margin-top: 80px;
            padding: 60px 25px;
            text-align: center;
            background: linear-gradient(to bottom, transparent, rgba(0,0,0,0.02));
            border-top: 1px solid rgba(0,0,0,0.05);
        }

        .cta-buy {
            display: inline-block;
            background: #111;
            color: #d4af37;
            text-decoration: none;
            font-family: 'Montserrat', sans-serif;
            font-weight: 600;
            letter-spacing: 2px;
            padding: 16px 40px;
            border-radius: 4px;
            text-transform: uppercase;
            font-size: 0.9rem;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }

        .cta-buy:hover {
            background: #d4af37;
            color: #111;
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(212, 175, 55, 0.3);
        }

        @media (max-width: 768px) {
            .reader-container {
                margin: 40px auto;
                padding: 0 20px;
            }
            body {
                font-size: 1.05rem;
            }
            h1.chapter-title {
                font-size: 2rem;
            }
            .reader-title {
                display: none;
            }
        }
    </style>
</head>
<body>

    
    <a href="{{LINK_BACK}}" class="back-hub-btn" aria-label="Retour au site">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M12 19L5 12L12 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    </a>

    <header class="reader-header">
        <span class="reader-title">{{HEADER_TITLE}}</span>
    </header>

    <main class="reader-container">
        
        <h1 class="chapter-title">{{CHAPTER_TITLE}}</h1>

        {{CONTENT}}

    </main>

    <footer class="reader-footer">
        <p style="font-family: 'Montserrat', sans-serif; font-size: 1rem; color: #666; text-align: center; margin-bottom: 30px;">
            {{FOOTER_TEXT}}
        </p>
        <a href="{{LINK_BUY}}" class="cta-buy">{{CTA_BUY}}</a>
    </footer>
</body>
</html>`;

const textFr = `C'était une belle soirée fraîche d'octobre 2024. La voûte céleste brillait de tous ses feux ; la lune dominait l'obscurité, les cheminées fumaient, et le gazouillis des criquets parvenait à l'oreille comme la douceur de la ouate sur la peau. Un vent d'ouest soufflait assez fort pour faire échouer, au pied d'une vieille clôture de planches de cèdre, le large feuillage caduc d'une plantation d'érables rouges. Candides, de jeunes enfants y formaient des amas où ils se dissimulaient en poussant des cris d'allégresse.

Non loin de là, dans un champ, les longues tiges de verge d'or et d'épilobe s'agitaient comme roulent les vagues à la mer. À l'orée, une haie de saules pleureurs, déjà dépouillés, balançait ses branches à la manière d'un balancier d'horloge. Juste de l'autre côté d'un petit chemin d'asphalte cahoteux, par la fenêtre à peine entrouverte d'une vieille maison normande, s'échappaient de douces notes de piano aux consonances harmonieuses, portées sans entrave par la brise automnale. Il y avait, ce soir-là, quelque chose de l'Éden mêlé à toute la mélancolie d'un paysage d'automne.

Cette harmonie fragile semblait pourtant tenir à peu de chose, comme si le moindre geste brusque, la moindre pensée trop lourde, pouvait fissurer cet équilibre délicat. L'automne, dans sa splendeur silencieuse, n'était jamais qu'un rappel : tout ce qui resplendit est voué à se transformer, à se dépouiller.

Dans cette douceur trompeuse, le temps semblait suspendu, comme s'il refusait d'avancer au même rythme que les jours ordinaires. Les soirs d'octobre avaient toujours cet effet-là sur le vieux Mr. Sisley : ils invitaient à la contemplation, mais surtout au retour sur soi.

La beauté du paysage n'apaisait pas. Elle rappelait. Elle rappelait les saisons passées, les visages absents, les voix qui ne résonnaient plus que dans la mémoire. Elle réveillait des images que Mr. Sisley croyait depuis longtemps enfouies, mais qui, en réalité, n'avaient jamais cessé de veiller en silence.

La maison elle-même semblait respirer au même rythme que lui, comme si les murs avaient appris à connaître ses silences, ses soupirs, ses longues absences intérieures. Rien n'y était vraiment moderne, mais tout y était à sa place, figé dans une époque qui lui ressemblait.

Blotti dans sa maison, il aimait se reposer dans son fauteuil de cuir de pécari, usé par le temps, deux ou trois gros oreillers bien placés, emmitouflé dans une couverture de percale ravaudée mais encore bien chaude. Il ne dormait pas, bien au contraire : l'esprit en éveil, les pensées en mouvement. Il réveillait ainsi ses souvenirs en écoutant sa musique favorite.

Il demeurait souvent immobile de longues minutes, le regard perdu dans un point invisible de la pièce. Le fauteuil avait épousé son corps au fil des années. Chaque craquelure du cuir, chaque affaissement du coussin portait la trace d'un usage fidèle, presque rituel. Une fois installé, il savait qu'il n'y aurait plus rien à faire d'autre qu'écouter... et attendre.

Attendre quoi, au juste, il n'aurait su le dire. Peut-être un souvenir plus précis que les autres. Peut-être un apaisement qui ne venait jamais. Ou simplement le passage lent des heures, comme on laisse filer une rivière en sachant qu'elle ne reviendra pas en arrière.

C'est alors que la musique prenait toute sa place. Elle devenait à la fois refuge et miroir, incapable de mentir. Elle ne l'apaisait pas ; elle le maintenait en contact avec ce qu'il avait été. Sans elle, il aurait eu l'impression de se trahir, de renier une part essentielle de lui-même. Elle était le dernier lien tangible avec l'homme qu'il avait été autrefois, avant les renoncements, avant les silences prolongés.

C'est dans cette fidélité qu'il puisait ses choix d'écoute. Monsieur Sisley affectionnait surtout la musique instrumentale et classique, profonde et très mélodieuse. Souvent, il s'assoupissait au milieu de ses souvenirs, la musique continuant de jouer toute la nuit, laissant parfois sur ses joues la trace de larmes séchées. Il semblait exister une harmonie parfaite entre le jaillissement de ses souvenirs et les notes qu'il entendait. Certaines œuvres paraissaient avoir été composées pour lui seul, comme si chaque mesure connaissait déjà ses blessures et ses regrets.

Ce soir-là, le volume de la musique était juste assez élevé pour laisser encore entendre le crépitement du bois qui se consumait lentement, au rythme des heures qui passaient. Il lui arrivait souvent, en écoutant Beethoven, de porter son mouchoir de soie à son nez, submergé par l'intensité jamais apaisée de ses émotions.

C'était comme si la musique le comprenait et lui répondait. Elle devenait l'écho de ses souvenirs et, dans le même mouvement, ravivait sa douleur, l'empêchant d'oublier l'ombre persistante de leurs passages.

Chaque note semblait raviver une cicatrice ancienne, jamais refermée, mais jamais totalement douloureuse non plus. Une douleur connue, apprivoisée, presque nécessaire. Il savait que ces notes faisaient remonter ce qu'il tentait pourtant de tenir à distance. Mais il préférait cette douleur familière au silence complet, qu'il redoutait encore davantage.

Le silence, pour lui, n'était pas repos. Il était vide, et le vide lui faisait peur. Lorsqu'il fermait les yeux et repensait à tous ces moments nostalgiques, l'effet était tel une lumière intense qui subsiste après que l'œil a reçu une vive impression lumineuse. Mais ici, il ne s'agissait pas d'un éblouissement, mais bien d'un fait vécu jadis qui l'avait profondément marqué et qui s'était cristallisé dans sa mémoire. Ces images revenaient sans prévenir, souvent au moment où il s'y attendait le moins, imposant leur présence avec une clarté troublante.

Octogénaire, Monsieur Sisley affectionnait particulièrement les moments de tranquillité, sans être dérangé par qui que ce soit. Comme Beethoven, il s'isolait dans son silence. Ceux qui connaissent Monsieur Sisley disent qu'on le sentait plein d'embarras et, de surcroît, qu'il éprouvait le sentiment que quelque chose était inachevé.

Malgré cela, c'est un homme bon et juste, faisant preuve d'une bonne sociabilité, hormis ses apparences taciturnes, et qu'il était gauche dans l'expression de ses émotions. Touchant et touché par tout ce qui l'entoure, voire philosophique à ses heures, il sait apprécier les belles choses de la vie et les faire partager à qui veut bien l'entendre.

Il donnait souvent l'impression d'être ailleurs, comme s'il écoutait une musique intérieure que les autres ne pouvaient entendre. Il parlait parfois longtemps, puis s'interrompait sans raison apparente. Certaines phrases restaient en suspens, comme si elles avaient atteint une limite qu'il n'osait pas franchir. Ces silences en disaient souvent plus long que ses mots.

Cette solitude ne s'était pas imposée brutalement. Elle s'était installée lentement, presque confortablement, au fil des renoncements. Elle s'était glissée dans les interstices de sa vie, entre deux saisons, entre deux décisions, jusqu'à devenir un état naturel, presque rassurant.

Sisley, comme il aimait qu'on l'appelle, n'était pas riche, mais ne pouvait se plaindre de pauvreté. Devenu paysagiste, il avait fondé, à la fin des années 1950, une petite entreprise d'entretien de terrains alors qu'il n'avait que 21 ans. Il y consacra dix années de sa vie, travaillant de cent à cent vingt heures par semaine.

À son apogée, Sisley dirigeait une vingtaine d'employés et disposait d'une machinerie variée, de la plus modeste tondeuse à gazon à la rétrocaveuse, en passant par des tracteurs agricoles affectés au déneigement. Il recevait en moyenne mille appels téléphoniques par mois. Cela ne l'effrayait pas ; bien au contraire, il s'en nourrissait.

Il avait le vent dans les voiles jusqu'au jour où il craqua, incapable de supporter plus longtemps ce poids sur ses épaules : les caprices des employés, les plaintes des clients, les soumissions et tout ce qui venait avec. Il travaillait sept jours sur sept. Les mots *vacances* et *congés* n'avaient aucune place dans son quotidien.

Dans les années qui suivirent, Sisley trouva, auprès de la petite ville de Lambton — sur la rive du lac Saint-François, dans les Cantons-de-l'Est — un emploi de journalier-opérateur. Cette période de labeur acharné avait forgé son caractère autant qu'elle avait contribué à l'user prématurément.`;

const textEn = `It was a beautiful, crisp evening in October 2024. The celestial vault shone in all its glory; the moon dominated the darkness, the chimneys smoked, and the chirping of crickets reached the ear like the softness of cotton wool against the skin. A westerly wind blew hard enough to wash up, at the foot of an old cedar plank fence, the broad deciduous foliage of a red maple plantation. Candid young children formed heaps there where they hid, letting out cries of joy.

Not far away, in a field, the long stems of goldenrod and fireweed waved like the rolling waves of the sea. At the edge of the woods, a hedge of weeping willows, already stripped bare, swung their branches like the pendulum of a clock. Just across a small, bumpy asphalt road, through the barely open window of an old Norman house, escaped soft piano notes with harmonious consonances, carried freely by the autumn breeze. There was, that evening, something of Eden mingled with all the melancholy of an autumn landscape.

This fragile harmony seemed, however, to hang by a thread, as if the slightest sudden gesture, the slightest thought too heavy, could crack this delicate balance. Autumn, in its silent splendor, was never anything but a reminder: all that shines is destined to transform, to shed its leaves.

In this deceptive sweetness, time seemed suspended, as if refusing to advance at the same pace as ordinary days. October evenings always had this effect on old Mr. Sisley: they invited contemplation, but above all a return to oneself.

The beauty of the landscape brought no solace. It reminded him. It reminded him of past seasons, absent faces, voices that echoed only in his memory. It awakened images that Mr. Sisley thought had long since been buried, but which, in reality, had never ceased to keep a silent watch.

The house itself seemed to breathe at his rhythm, as if the walls had learned to know his silences, his sighs, his long inner absences. Nothing was truly modern, but everything was in its place, frozen in an era that resembled him.

Huddled in his house, he liked to rest in his peccary leather armchair, worn by time, two or three large pillows well placed, bundled up in a mended but still warm percale blanket. He wasn't sleeping, quite the contrary: his mind alert, his thoughts in motion. He awakened his memories in this way while listening to his favorite music.

He often remained motionless for long minutes, his gaze lost in an invisible point in the room. The armchair had molded to his body over the years. Every crack in the leather, every sag in the cushion bore the mark of faithful, almost ritual use. Once settled, he knew there was nothing else to do but listen... and wait.

Wait for what, exactly, he couldn't have said. Perhaps a memory more vivid than the rest. Perhaps a peace that never came. Or simply the slow passage of hours, like letting a river flow, knowing it will not turn back.

It was then that music took its full place. It became both refuge and mirror, incapable of lying. It didn't soothe him; it kept him in touch with who he had been. Without it, he would have felt he was betraying himself, denying an essential part of his being. It was the last tangible link with the man he once was, before the renunciations, before the prolonged silences.

It was from this loyalty that he drew his listening choices. Mr. Sisley especially favored classical and instrumental music, deep and highly melodious. Often, he dozed off amidst his memories, the music playing on through the night, sometimes leaving the trail of dried tears on his cheeks. There seemed to be a perfect harmony between the outpouring of his memories and the notes he heard. Some pieces seemed to have been composed for him alone, as if every measure already knew his wounds and regrets.

That evening, the music's volume was just high enough to still let him hear the crackling of the slowly burning wood, keeping time with the passing hours. He often found himself, listening to Beethoven, bringing his silk handkerchief to his nose, overwhelmed by the never-appeased intensity of his emotions.

It was as if the music understood and answered him. It became the echo of his memories and, in the same motion, revived his pain, preventing him from forgetting the lingering shadow of their passing.

Every note seemed to reopen an old scar, never closed, yet never entirely painful either. A familiar, tamed, almost necessary pain. He knew these notes stirred up what he nonetheless tried to hold at bay. But he preferred this familiar ache over complete silence, which he dreaded even more.

Silence, for him, was not rest. It was void, and the void frightened him. When he closed his eyes and looked back on all those nostalgic moments, the effect was like an intense light that lingers after the eye has received a vivid luminous impression. But here, it wasn't a glare, but rather a lived event from the past that had deeply marked him and crystallized in his memory. These images returned without warning, often when he least expected them, imposing their presence with unsettling clarity.

An octogenarian, Mr. Sisley particularly cherished moments of tranquility, undisturbed by anyone. Like Beethoven, he isolated himself in his silence. Those who know Mr. Sisley say he seemed full of embarrassment and, moreover, that he felt a sense of something unfinished.

Despite this, he is a good and fair man, demonstrating pleasant sociability despite his taciturn appearance, and being clumsy in expressing his emotions. Touching and touched by everything around him, even philosophical at times, he knows how to appreciate the beautiful things in life and share them with whoever wishes to listen.

He often gave the impression of being elsewhere, as if listening to an inner music others could not hear. He sometimes spoke for a long time, then paused for no apparent reason. Certain sentences hung in the air, as if they had reached a line he dared not cross. These silences often said more than his words.

This loneliness hadn't imposed itself abruptly. It had settled in slowly, almost comfortably, through the course of renunciations. It had slipped into the spaces between his life, between two seasons, between two decisions, until it became a natural, almost reassuring state.

Sisley, as he liked to be called, wasn't rich, but he couldn't complain of poverty. Becoming a landscaper, he founded a small property maintenance company in the late 1950s when he was only 21. He devoted ten years of his life to it, working a hundred to a hundred and twenty hours a week.

At his peak, Sisley managed around twenty employees and owned a variety of machinery, from the humblest lawnmower to the backhoe, including agricultural tractors used for snow removal. He received an average of a thousand phone calls a month. This didn't frighten him; on the contrary, he thrived on it.

He had the wind in his sails until the day he broke down, unable to bear the weight on his shoulders any longer: the whims of employees, customer complaints, quotes, and everything that came with it. He worked seven days a week. The words <i>vacation</i> and <i>holidays</i> had no place in his daily life.

In the years that followed, Sisley found a job as a laborer-operator near the small town of Lambton—on the shores of Lake Saint-François, in the Eastern Townships. This period of relentless labor forged his character as much as it had contributed to wearing him out prematurely.`;

const textEs = `Era una hermosa y fresca tarde de octubre de 2024. La bóveda celeste brillaba en todo su esplendor; la luna dominaba la oscuridad, las chimeneas humeaban, y el canto de los grillos llegaba al oído como la suavidad del algodón sobre la piel. Un viento del oeste soplaba con fuerza suficiente para hacer llegar, al pie de una vieja cerca de tablones de cedro, el ancho follaje caduco de una plantación de arces rojos. Cándidos, niños pequeños formaban montones allí donde se escondían, dejando escapar gritos de alegría.

No muy lejos, en un campo, los largos tallos de la vara de oro y la adelfilla se agitaban como el vaivén de las olas en el mar. En la linde del bosque, un seto de sauces llorones, ya despojados, balanceaban sus ramas a la manera del péndulo de un reloj. Justo al otro lado de un pequeño camino de asfalto lleno de baches, por la ventana entreabierta de una vieja casa normanda, escapaban suaves notas de piano con consonancias armoniosas, llevadas sin trabas por la brisa otoñal. Había, esa noche, algo de Edén mezclado con toda la melancolía de un paisaje de otoño.

Esta frágil armonía, sin embargo, parecía pender de un hilo, como si el menor gesto brusco, el menor pensamiento demasiado pesado, pudiera fisurar aquel delicado equilibrio. El otoño, en su silencioso esplendor, no era nunca otra cosa que un recordatorio: todo lo que resplandece está destinado a transformarse, a despojarse.

En esta dulzura engañosa, el tiempo parecía suspendido, como si se negara a avanzar al mismo ritmo que los días ordinarios. Las noches de octubre siempre tenían este efecto en el viejo Sr. Sisley: invitaban a la contemplación, pero sobre todo, a un regreso a sí mismo.

La belleza del paisaje no lo calmaba. Le recordaba. Le recordaba temporadas pasadas, rostros ausentes, voces que ya solo resonaban en la memoria. Despertaba imágenes que el Sr. Sisley creía enterradas hacía mucho tiempo, pero que, en realidad, nunca habían dejado de velar en silencio.

La casa misma parecía respirar a su mismo ritmo, como si las paredes hubieran aprendido a conocer sus silencios, sus suspiros, sus largas ausencias interiores. Nada era verdaderamente moderno, pero todo estaba en su lugar, congelado en una época que se le parecía.

Acurrucado en su casa, le gustaba descansar en su sillón de cuero de pecarí, desgastado por el tiempo, dos o tres grandes almohadas bien colocadas, abrigado con una vieja pero aún muy cálida manta de percal. No dormía, al contrario: su mente alerta, sus pensamientos en movimiento. Despertaba así sus recuerdos escuchando su música favorita.

A menudo permanecía inmóvil durante largos minutos, con la mirada perdida en un punto invisible de la habitación. El sillón se había adaptado a su cuerpo a lo largo de los años. Cada grieta en el cuero, cada hundimiento del cojín llevaba la marca de un uso fiel, casi ritual. Una vez instalado, sabía que no había nada más que hacer que escuchar... y esperar.

Esperar qué, exactamente, no habría sabido decirlo. Tal vez un recuerdo más preciso que los demás. Tal vez una paz que nunca llegaba. O simplemente el paso lento de las horas, como dejar correr un río sabiendo que no volverá atrás.

Fue entonces cuando la música ocupó todo su lugar. Se convertía a la vez en refugio y espejo, incapaz de mentir. No lo apaciguaba; lo mantenía en contacto con el que había sido. Sin ella, habría tenido la impresión de traicionarse a sí mismo, de negar una parte esencial de su ser. Era el último vínculo tangible con el hombre que había sido tiempo atrás, antes de las renuncias, antes de los silencios prolongados.

De esta lealtad sacaba sus opciones de escucha. El Sr. Sisley apreciaba especialmente la música clásica e instrumental, profunda y muy melodiosa. A menudo, se adormecía en medio de sus recuerdos, con la música sonando durante toda la noche, dejando a veces el rastro de lágrimas secas en sus mejillas. Parecía existir una armonía perfecta entre el brote de sus recuerdos y las notas que escuchaba. Algunas piezas parecían haber sido compuestas solo para él, como si cada compás ya conociera sus heridas y remordimientos.

Esa noche, el volumen de la música era lo suficientemente alto como para permitirle oír aún el crepitar de la madera que se consumía lentamente, al ritmo de las horas que pasaban. A menudo se sorprendía, escuchando a Beethoven, llevándose el pañuelo de seda a la nariz, abrumado por la intensidad nunca saciada de sus emociones.

Era como si la música lo entendiera y le respondiera. Se convertía en el eco de sus recuerdos y, en el mismo movimiento, reavivaba su dolor, impidiéndole olvidar la sombra persistente de su paso.

Cada nota parecía reavivar una vieja cicatriz, nunca cerrada, pero nunca totalmente dolorosa tampoco. Un dolor familiar, domesticado, casi necesario. Sabía que estas notas removían lo que sin embargo trataba de mantener a distancia. Pero prefería este dolor familiar al silencio completo, que temía aún más.

El silencio, para él, no era descanso. Era el vacío, y el vacío le asustaba. Cuando cerraba los ojos y repasaba todos esos momentos nostálgicos, el efecto era como una luz intensa que persiste después de que el ojo ha recibido una fuerte impresión luminosa. Pero aquí no se trataba de un destello ciego, sino de un hecho vivido antaño que le había marcado profundamente y que se había cristalizado en su memoria. Estas imágenes regresaban sin avisar, a menudo cuando menos lo esperaba, imponiendo su presencia con una claridad perturbadora.

Octogenario, el Sr. Sisley apreciaba particularmente los momentos de tranquilidad, sin ser molestado por nadie. Como Beethoven, se aislaba en su silencio. Los que conocen al Sr. Sisley dicen que se le sentía lleno de vergüenza y, además, que experimentaba el sentimiento de que algo estaba inacabado.

A pesar de esto, es un hombre bueno y justo, demostrando una buena sociabilidad, a excepción de su apariencia taciturna, y era torpe en la expresión de sus emociones. Conmovedor y conmovido por todo lo que le rodea, incluso filosófico a veces, sabe apreciar las cosas bellas de la vida y compartirlas con quien quiera escucharlo.

A menudo daba la impresión de estar en otra parte, como si escuchara una música interior que los demás no podían percibir. A veces hablaba durante mucho tiempo, para luego detenerse sin motivo aparente. Ciertas frases quedaban en suspenso, como si hubieran alcanzado un límite que no se atreviera a cruzar. Estos silencios decían a menudo más que sus palabras.

Esta soledad no se había impuesto bruscamente. Se había instalado lentamente, casi cómodamente, con el paso de las renuncias. Se había deslizado en los intersticios de su vida, entre dos estaciones, entre dos decisiones, hasta convertirse en un estado natural, casi tranquilizador.

Sisley, como le gustaba que le llamaran, no era rico, pero no podía quejarse de pobreza. Convertido en paisajista, había fundado, a finales de la década de 1950, una pequeña empresa de mantenimiento de terrenos cuando solo tenía 21 años. Dedicó diez años de su vida a ella, trabajando de cien a ciento veinte horas semanales.

En su apogeo, Sisley dirigía a una veintena de empleados y disponía de una variada maquinaria, desde la podadora de césped más modesta hasta la retroexcavadora, pasando por tractores agrícolas destinados a quitar la nieve. Recibía de media mil llamadas telefónicas al mes. Esto no le asustaba; al contrario, se nutría de ello.

Tenía el viento en popa hasta el día en que se derrumbó, incapaz de soportar por más tiempo ese peso sobre sus hombros: los caprichos de los empleados, las quejas de los clientes, las cotizaciones y todo lo que conllevaba. Trabajaba siete días a la semana. Las palabras <i>vacaciones</i> y <i>días libres</i> no tenían cabida en su vida diaria.

En los años que siguieron, Sisley encontró, cerca de la pequeña ciudad de Lambton — a orillas del lago Saint-François, en los Cantones del Este — un empleo de jornalero-operador. Este período de trabajo incansable forjó su carácter tanto como contribuyó a desgastarlo prematuramente.`;

const replaceVariables = (html, config) => {
    let result = html;
    for (const [key, value] of Object.entries(config)) {
        result = result.split('{{' + key + '}}').join(value);
    }
    return result;
};

const baseUrl = 'https://simonlero.com';

const frConfig = {
    LANG: 'fr',
    URL_BASE: baseUrl,
    TITLE_SEO: 'Extrait gratuit - Rencontres au clair de lune | Simon Lero',
    DESC_SEO: "Découvrez un extrait exclusif du roman LGBTQ+ 'Rencontres au clair de lune' de Simon Lero.",
    LINK_BACK: 'livre.html',
    TEXT_BACK: 'Retour au site',
    HEADER_TITLE: 'Extrait Gratuit',
    CHAPTER_TITLE: 'Chapitre I',
    CONTENT: textFr.split('\n\n').map(p => '        <p>' + p + '</p>').join('\n'),
    FOOTER_TEXT: "Vous avez apprécié cet extrait ? Découvrez la suite de l'histoire.",
    LINK_BUY: 'livre.html#buy',
    CTA_BUY: 'Commander le livre',
    FR_ACTIVE: 'active',
    EN_ACTIVE: '',
    ES_ACTIVE: ''
};

const enConfig = {
    LANG: 'en',
    URL_BASE: baseUrl,
    TITLE_SEO: 'Free Excerpt - Encounters in the Moonlight | Simon Lero',
    DESC_SEO: "Discover an exclusive excerpt from the LGBTQ+ novel 'Encounters in the Moonlight' by Simon Lero.",
    LINK_BACK: 'livre-en.html',
    TEXT_BACK: 'Back to site',
    HEADER_TITLE: 'Free Excerpt',
    CHAPTER_TITLE: 'Chapter I',
    CONTENT: textEn.split('\n\n').map(p => '        <p>' + p + '</p>').join('\n'),
    FOOTER_TEXT: "Did you enjoy this excerpt? Discover the rest of the story.",
    LINK_BUY: 'livre-en.html#buy',
    CTA_BUY: 'Order the book',
    FR_ACTIVE: '',
    EN_ACTIVE: 'active',
    ES_ACTIVE: ''
};

const esConfig = {
    LANG: 'es',
    URL_BASE: baseUrl,
    TITLE_SEO: 'Extracto Gratuito - Encuentros a la luz de la luna | Simon Lero',
    DESC_SEO: "Descubre un extracto exclusivo de la novela LGBTQ+ 'Encuentros a la luz de la luna' de Simon Lero.",
    LINK_BACK: 'livre-es.html',
    TEXT_BACK: 'Volver al sitio',
    HEADER_TITLE: 'Extracto Gratuito',
    CHAPTER_TITLE: 'Capítulo I',
    CONTENT: textEs.split('\n\n').map(p => '        <p>' + p + '</p>').join('\n'),
    FOOTER_TEXT: "¿Te ha gustado este extracto? Descubre el resto de la historia.",
    LINK_BUY: 'livre-es.html#buy',
    CTA_BUY: 'Pedir el libro',
    FR_ACTIVE: '',
    EN_ACTIVE: '',
    ES_ACTIVE: 'active'
};

fs.writeFileSync(path.join(__dirname, 'extrait.html'), replaceVariables(htmlTemplate, frConfig));
fs.writeFileSync(path.join(__dirname, 'extrait-en.html'), replaceVariables(htmlTemplate, enConfig));
fs.writeFileSync(path.join(__dirname, 'extrait-es.html'), replaceVariables(htmlTemplate, esConfig));

console.log('Extraits generated.');

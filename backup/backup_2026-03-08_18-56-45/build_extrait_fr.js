const fs = require('fs');
const path = require('path');

const htmlTemplate = `<!DOCTYPE html>
<html lang="{{LANG}}" dir="ltr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">
    <title>{{TITLE_SEO}}</title>
    <meta name="description" content="{{DESC_SEO}}">

    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Lora:ital,wght@0,400;0,500;1,400&family=Montserrat:wght@300;400;500;600&display=swap" rel="stylesheet">
    
    <style>
        :root {
            --bg-color: #fdfbf7;
            --text-color: #2c2c2c;
            --accent-gold: transparent;
            --font-reading: 'Lora', serif;
            --font-display: 'Playfair Display', serif;
        }

        body {
            background-color: var(--bg-color);
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
            background: rgba(253, 251, 247, 0.95);
            backdrop-filter: blur(10px);
            padding: 15px 5%;
            border-bottom: 1px solid rgba(0,0,0,0.05);
            display: flex;
            justify-content: space-between;
            align-items: center;
            z-index: 100;
        }

        .back-btn {
            color: #555;
            text-decoration: none;
            font-family: 'Montserrat', sans-serif;
            font-size: 0.9rem;
            font-weight: 500;
            display: flex;
            align-items: center;
            gap: 8px;
            transition: color 0.3s ease;
        }

        .back-btn:hover {
            color: #d4af37;
        }

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

        p:first-of-type::first-letter {
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

    <header class="reader-header">
        <a href="{{LINK_BACK}}" class="back-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            {{TEXT_BACK}}
        </a>
        <span class="reader-title">{{HEADER_TITLE}}</span>
        <div style="width: 100px;"></div>
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

Dans cette douceur trompeuse, le temps semblait suspendu, comme s'il refusait d'avancer au même rythme que les jours ordinaires. Les soirs d'octobre avaient toujours cet effet-là sur le vieux Mr. Sisley : ils l'invitaient à la contemplation, mais surtout au retour sur soi.

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

Cette solitude ne s'était pas imposée brutalement. Elle s'était installée lentement, presque confortablement, au fil des renoncements. Elle s'était glissée dans les interstices de sa vie,`;

const htmlFr = htmlTemplate
    .replace('{{LANG}}', 'fr')
    .replace('{{TITLE_SEO}}', 'Extrait gratuit - Rencontres au clair de lune | Simon Lero')
    .replace('{{DESC_SEO}}', "Découvrez un extrait exclusif de quelques pages du roman LGBTQ+ 'Rencontres au clair de lune' de Simon Lero.")
    .replace('{{LINK_BACK}}', 'livre.html')
    .replace('{{TEXT_BACK}}', 'Retour au site')
    .replace('{{HEADER_TITLE}}', 'Extrait Gratuit')
    .replace('{{CHAPTER_TITLE}}', 'Chapitre I')
    .replace('{{CONTENT}}', textFr.split('\\n\\n').map(p => \`        <p>\${p}</p>\`).join('\\n'))
    .replace('{{FOOTER_TEXT}}', "Vous avez apprécié cet extrait ? Découvrez la suite de l'histoire.")
    .replace('{{LINK_BUY}}', 'livre.html#cta')
    .replace('{{CTA_BUY}}', 'Commander le livre');

fs.writeFileSync(path.join(__dirname, 'extrait.html'), htmlFr);
console.log('extrait.html written');

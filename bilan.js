// ===============================
// ÉLÉMENTS
// ===============================
const cardsContainer = document.getElementById("cardsContainer");
const cards = document.querySelectorAll(".care-card");
const detailSection = document.getElementById("careDetail");
const careText = document.getElementById("careText");
const softReturnBtn = document.getElementById("softReturn");
const backHomeBtn = document.querySelector(".back-home");

// ===============================
// TEXTE TEST (SAFE)
// ===============================
const careTexts = {
"fatigue-legere": `
<h3>Ralentir sans tout arrêter</h3>

<p>
Ce que tu ressens n’est pas une fatigue qui écrase.
C’est une fatigue qui s’installe doucement,
presque silencieusement.
</p>

<p>
Tu continues d’avancer.
Tu fais ce qu’il faut.
Tu réponds, tu t’adaptes, tu tiens.
</p>

<p>
Mais tout te demande un peu plus d’effort qu’avant.
Un peu plus d’énergie.
Un peu plus de concentration.
</p>

<p>
Cette soirée n’est pas là pour te transformer,
ni pour « récupérer à fond ».
</p>

<p>
Elle est là pour
<b>desserrer la pression juste assez</b>
pour que ton corps et ton esprit puissent respirer.
</p>

<p>
Commence par préparer ton espace.
Pas besoin que ce soit parfait.
Juste plus doux.
</p>

<p>
Une lumière tamisée.
Un plaid.
Un endroit où ton corps peut s’installer
sans se tenir, sans se contracter.
</p>

<p>
Ensuite, choisis une activité lente,
sans enjeu.
</p>

<p>
Une série déjà vue.
Un film que tu peux regarder sans suivre chaque détail.
Une musique qui ralentit la respiration.
Un livre que tu peux fermer à tout moment.
</p>

<p>
Le mot-clé de cette soirée est simple :
<b>rien n’est obligatoire</b>.
</p>

<p>
Si ton esprit te pousse à faire autre chose,
à être productif·ve,
à optimiser ce moment,
</p>

<p>
rappelle-toi ceci :
</p>

<p>
<b>
Tu n’es pas en train de perdre du temps.
Tu es en train de le rendre respirable.
</b>
</p>

<p>
Autorise-toi à répondre plus tard.
À ne pas être disponible pour tout.
À t’arrêter avant d’être vidé·e.
</p>

<p>
Cette fatigue légère n’est pas un problème à corriger.
C’est un message.
</p>

<p>
Et ce soir,
tu peux simplement lui répondre
par un peu de douceur.
</p>

<p>
<b>
Tu n’as rien à réparer.
Juste à t’accompagner,
un peu mieux que d’habitude.
</b>
</p>
`,
"fatigue-profonde": `
<h3>Récupération totale</h3>

<p>
Cette fatigue-là ne disparaît pas avec une simple pause.
Elle s’est installée plus profondément.
</p>

<p>
Ton corps est fatigué.
Ton esprit aussi.
Et même quand tu t’arrêtes,
tu peux avoir l’impression que le repos ne suffit plus.
</p>

<p>
Cette soirée n’est pas là pour « aller mieux ».
Elle est là pour
<b>ne rien demander de plus</b>.
</p>

<p>
Ce soir, tout ce qui ressemble à un effort
peut être laissé de côté.
</p>

<p>
Commence par accepter une chose essentielle :
<b>tu as le droit de t’arrêter complètement</b>.
</p>

<p>
Pas de stimulation.
Pas d’objectifs.
Pas de rattrapage.
</p>

<p>
Prépare un espace qui protège ton corps.
Un lit, un canapé, un sol avec des coussins.
Quelque chose qui soutient,
pas qui exige.
</p>

<p>
Si tu peux,
réduis les sources de bruit.
Les écrans lumineux.
Les discussions.
Les décisions.
</p>

<p>
Ton système a besoin de silence,
ou au moins de simplicité.
</p>

<p>
Autorise-toi à ne rien faire « d’utile ».
À rester immobile.
À fermer les yeux sans dormir.
À respirer lentement,
sans chercher à contrôler.
</p>

<p>
Si des pensées arrivent,
ne lutte pas.
Laisse-les passer
comme des vagues lentes.
</p>

<p>
Ce soir,
tu n’as pas besoin de te comprendre,
ni de te réparer.
</p>

<p>
Tu as seulement besoin
de <b>ne plus porter</b>.
</p>

<p>
Si ton corps demande le sommeil,
offre-le-lui.
Même tôt.
Même sans justification.
</p>

<p>
La récupération profonde
commence souvent
quand on arrête de se demander
si on en fait assez.
</p>

<p>
<b>
Tu n’es pas en retard.
Tu es fatigué·e.
</b>
</p>

<p>
Et ce soir,
le repos n’est pas une récompense.
</p>

<p>
C’est une nécessité.
</p>
`,
  "anxiete": `
<h3>Créer de la sécurité intérieure</h3>

<p>
Quand l’anxiété est là,
ce n’est pas que quelque chose ne va pas.
C’est souvent que ton système intérieur
ne se sent pas totalement en sécurité.
</p>

<p>
Même au repos,
ton esprit reste en alerte.
Il anticipe.
Il analyse.
Il vérifie.
</p>

<p>
Ce soir n’est pas là pour comprendre l’anxiété,
ni pour la faire disparaître.
</p>

<p>
Il est là pour envoyer un message simple à ton corps :
<b>« tu peux relâcher un peu »</b>.
</p>

<p>
Commence par ralentir l’environnement.
Baisse la lumière.
Réduis les sons.
Évite tout ce qui pourrait te surprendre ou t’accélérer.
</p>

<p>
Choisis un endroit où tu peux te sentir contenu·e.
Un coin du canapé.
Un lit.
Un mur dans ton dos.
</p>

<p>
Le corps se calme plus facilement
quand il se sent soutenu.
</p>

<p>
Pose une main sur ton ventre
ou sur ta poitrine.
Pas pour contrôler ta respiration,
juste pour sentir ta présence.
</p>

<p>
Laisse l’air entrer.
Laisse-le sortir.
Sans rythme imposé.
</p>

<p>
Si des pensées arrivent,
ne cherche pas à les chasser.
Dis-toi simplement :
« je suis en sécurité, là, maintenant ».
</p>

<p>
Tu n’as rien à résoudre ce soir.
Rien à prévoir.
Rien à anticiper.
</p>

<p>
Autorise-toi une activité rassurante.
Quelque chose de familier.
Déjà vu.
Déjà connu.
</p>

<p>
L’anxiété diminue souvent
quand le cerveau comprend
qu’il n’y a rien de nouveau à gérer.
</p>

<p>
Si ton corps est tendu,
étire-le lentement.
Très lentement.
Comme si tu ne voulais pas le réveiller.
</p>

<p>
Ce soir,
tu n’as pas besoin d’être courageux·se.
</p>

<p>
<b>
Tu as juste besoin d’être en sécurité.
</b>
</p>

<p>
Et cette sécurité,
tu peux commencer à la construire ici,
maintenant,
dans cette soirée calme que tu t’offres.
</p>
`,
  "hypersensibilite": `
<h3>Baisser le volume</h3>

<p>
Quand tu es hypersensible,
ce n’est pas que tu ressens trop.
C’est que tu ressens <b>finement</b>,
en continu,
sans filtre.
</p>

<p>
Les sons, les lumières,
les émotions,
les paroles,
les ambiances…
Tout passe par toi.
</p>

<p>
Et à force,
le monde peut devenir bruyant,
même quand il est silencieux.
</p>

<p>
Ce soir n’est pas là pour te rendre moins sensible.
Il est là pour
<b>baisser le volume autour de toi</b>.
</p>

<p>
Commence par réduire les stimulations.
Une seule lumière douce.
Pas d’écran agressif.
Pas de musique trop présente.
</p>

<p>
Si tu mets du son,
choisis quelque chose de lent,
de répétitif,
qui ne raconte pas d’histoire.
</p>

<p>
Ton système nerveux a besoin de prévisibilité.
</p>

<p>
Prépare-toi une boisson chaude.
Quelque chose qui réchauffe doucement.
Prends le temps de la tenir entre tes mains.
</p>

<p>
Ce geste simple envoie un signal clair :
« je prends soin de moi ».
</p>

<p>
Installe-toi dans un espace où tu peux
<b>ne rien capter</b>.
Pas les autres.
Pas leurs émotions.
Pas leurs attentes.
</p>

<p>
Si tu es fatigué·e émotionnellement,
autorise-toi à ne pas répondre,
ne pas expliquer,
ne pas justifier.
</p>

<p>
Ce soir,
tu n’as pas à absorber le monde.
</p>

<p>
Tu peux te créer une bulle.
Temporaire.
Protectrice.
Suffisante.
</p>

<p>
Si des émotions montent,
ne les analyses pas.
Laisse-les passer comme une vague lente.
</p>

<p>
Tu n’es pas fragile.
Tu es réceptif·ve.
</p>

<p>
<b>
Et ce soir,
tu as le droit de fermer les portes.
</b>
</p>

<p>
Le monde peut attendre.
</p>
`,
  "confusion": `
<h3>Ne pas chercher de réponses</h3>

<p>
Quand tu te sens confus·e,
ce n’est pas que tu n’as pas de direction.
C’est que <b>trop de choses se mélangent</b>
à l’intérieur.
</p>

<p>
Tu peux avoir l’impression de ne plus savoir
ce que tu ressens vraiment,
ce que tu veux,
ce qui te ferait du bien.
</p>

<p>
Les pensées se croisent.
Les émotions se contredisent.
Et plus tu cherches à comprendre,
plus tout devient flou.
</p>

<p>
Ce soir n’est pas là pour trouver des réponses.
</p>

<p>
Il est là pour
<b>arrêter de chercher</b>.
</p>

<p>
La confusion n’a pas besoin d’être résolue immédiatement.
Elle a surtout besoin d’espace.
</p>

<p>
Commence par t’éloigner de tout ce qui demande une décision.
Pas de listes.
Pas de choix importants.
Pas de réflexion sur « après ».
</p>

<p>
Installe-toi dans quelque chose de très simple.
Quelque chose de concret.
</p>

<p>
Un repas facile.
Une douche chaude.
Un geste répétitif.
</p>

<p>
Quand le mental tourne,
le corps peut aider à ralentir.
</p>

<p>
Ce soir,
fais une seule chose à la fois.
Même lentement.
Même imparfaitement.
</p>

<p>
Si une pensée arrive,
tu n’as pas besoin de la suivre.
</p>

<p>
Dis-toi simplement :
« pas ce soir ».
</p>

<p>
La clarté ne naît pas sous la pression.
</p>

<p>
Elle revient souvent
quand on cesse de la forcer.
</p>

<p>
<b>
Tu n’es pas perdu·e.
Tu es en pause.
</b>
</p>

<p>
Et ce soir,
c’est exactement là où tu dois être.
</p>
`,
  "auto-exigence": `
<h3>Lâcher le contrôle</h3>

<p>
Tu en demandes beaucoup.
Peut-être trop.
</p>

<p>
Pas forcément parce que quelqu’un t’y oblige,
mais parce que tu as appris à tenir,
à assurer,
à ne pas faillir.
</p>

<p>
Tu peux avoir l’impression que si tu relâches,
tout va s’effondrer.
Alors tu continues.
Même fatigué·e.
Même vidé·e.
</p>

<p>
Cette exigence n’est pas un défaut.
Elle vient souvent d’un désir profond de bien faire,
de ne pas décevoir,
de garder le contrôle quand l’intérieur vacille.
</p>

<p>
Mais ce soir,
tu n’as rien à prouver.
</p>

<p>
Cette soirée n’est pas une récompense
pour avoir « bien travaillé ».
Ce n’est pas une pause méritée.
</p>

<p>
C’est un droit.
</p>

<p>
Commence par poser ce que tu fais « pour être à la hauteur ».
Même symboliquement.
</p>

<p>
Ferme les onglets inutiles.
Laisse un message sans réponse.
Arrête une tâche avant de l’avoir parfaitement terminée.
</p>

<p>
Observe ce que ça fait.
</p>

<p>
Peut-être une tension.
Peut-être de la culpabilité.
C’est normal.
</p>

<p>
Ne cherche pas à la faire disparaître.
Reste avec.
</p>

<p>
Ensuite,
choisis quelque chose qui n’a aucun objectif.
</p>

<p>
Pas quelque chose qui te rend meilleur·e.
Pas quelque chose qui te fait avancer.
</p>

<p>
Quelque chose qui n’a pas besoin d’être réussi.
</p>

<p>
Un film imparfait.
Un jeu sans enjeu.
Une musique qui ne sert qu’à remplir le silence.
</p>

<p>
Si une petite voix te dit
« tu pourrais faire mieux »,
réponds-lui doucement :
</p>

<p>
<b>
« Ce soir, c’est suffisant. »
</b>
</p>

<p>
Tu n’es pas en train de perdre ta rigueur.
</p>

<p>
Tu es en train de t’autoriser à respirer
sans te surveiller.
</p>

<p>
<b>
Tu n’as pas besoin d’être exigeant·e pour avoir de la valeur.
</b>
</p>

<p>
Ce soir,
tu peux simplement être.
</p>
`,
  "epuisement-emotionnel": `
<h3>Ne rien absorber</h3>

<p>
Tu donnes beaucoup.
Souvent sans t’en rendre compte.
</p>

<p>
Tu écoutes.
Tu soutiens.
Tu encaisses.
Tu t’adaptes aux humeurs, aux besoins, aux silences des autres.
</p>

<p>
Et à force,
quelque chose en toi s’est saturé.
</p>

<p>
Ce n’est pas une fatigue du corps.
C’est une fatigue du lien.
</p>

<p>
Celle qui apparaît quand tu es trop souvent disponible,
trop souvent à l’écoute,
trop souvent en train de porter ce qui ne t’appartient pas.
</p>

<p>
Ce soir,
tu n’as pas besoin de te réparer.
</p>

<p>
Tu as besoin de ne plus rien recevoir.
</p>

<p>
Cette soirée est une soirée <b>fermée</b>.
Pas au monde,
mais à l’absorption.
</p>

<p>
Commence par réduire les entrées.
</p>

<p>
Pas de conversations lourdes.
Pas de contenus chargés émotionnellement.
Pas d’actualités.
Pas de récits qui demandent de l’empathie.
</p>

<p>
Choisis quelque chose de neutre.
</p>

<p>
Une série légère.
Un film visuellement doux.
Des images qui glissent sans s’accrocher.
</p>

<p>
Tu n’as pas besoin de ressentir fort.
Tu n’as pas besoin de comprendre.
</p>

<p>
Si quelqu’un te parle ce soir,
tu peux répondre peu.
Ou plus tard.
Ou pas du tout.
</p>

<p>
Ce n’est pas de l’égoïsme.
C’est une limite vitale.
</p>

<p>
Installe ton corps dans un endroit où il n’a rien à contenir.
</p>

<p>
Un plaid.
Une position confortable.
Une respiration qui n’a pas besoin d’être profonde,
juste libre.
</p>

<p>
Si tu te sens vide,
laisse ce vide exister.
</p>

<p>
Il n’est pas inquiétant.
Il est réparateur.
</p>

<p>
Ce vide,
c’est l’espace qui se recrée
quand tu arrêtes de porter pour les autres.
</p>

<p>
<b>
Tu as le droit de ne rien absorber.
</b>
</p>

<p>
Ce soir,
tu peux simplement te laisser être
sans te remplir de ce qui fatigue.
</p>
`,
  "deconnexion": `
<h3>Revenir doucement au corps</h3>

<p>
Tu n’es pas vraiment fatigué·e.
Pas vraiment anxieux·se non plus.
</p>

<p>
Tu es surtout… un peu loin.
</p>

<p>
Comme si tu étais là sans être complètement là.
Comme si ton esprit avançait en automatique,
pendant que ton corps, lui, restait en arrière.
</p>

<p>
Cette déconnexion n’est pas une faute.
C’est souvent une protection.
</p>

<p>
Quand trop de choses s’accumulent,
quand ressentir devient trop intense,
on se met à distance.
Sans même le décider.
</p>

<p>
Ce soir, il ne s’agit pas de “revenir à toi” brutalement.
Ni de te forcer à ressentir.
</p>

<p>
Il s’agit de <b>revenir doucement</b>.
</p>

<p>
Cette soirée n’est pas mentale.
Elle est corporelle.
</p>

<p>
Commence par quelque chose de simple :
changer de vêtements.
</p>

<p>
Des habits plus amples.
Plus doux.
Quelque chose qui ne serre pas,
qui ne rappelle pas les obligations de la journée.
</p>

<p>
Ensuite, reconnecte-toi par les sensations.
</p>

<p>
Une boisson chaude.
Sentir la chaleur dans les mains.
Le goût qui s’installe lentement.
</p>

<p>
Ou une douche tiède,
pas pour te laver,
mais pour sentir l’eau couler,
la température,
le contact sur la peau.
</p>

<p>
Évite ce qui te tire hors de toi.
</p>

<p>
Pas d’écrans rapides.
Pas de contenus bruyants.
Pas de multitâche.
</p>

<p>
Choisis une musique lente,
ou même le silence.
</p>

<p>
Si des pensées arrivent,
laisse-les passer.
Tu n’as rien à analyser ce soir.
</p>

<p>
Ramène simplement ton attention
à ce que ton corps perçoit :
</p>

<p>
le poids de ton corps,
la respiration,
les points d’appui.
</p>

<p>
Même si tu ne ressens presque rien,
c’est déjà suffisant.
</p>

<p>
La reconnexion ne se force pas.
Elle se permet.
</p>

<p>
<b>
Tu n’as pas besoin d’aller quelque part.
Tu as juste besoin de revenir ici.
</b>
</p>
`,
  "transition": `
<h3>Entre deux mondes</h3>

<p>
Tu n’es plus tout à fait là où tu étais avant.
Mais pas encore là où tu iras ensuite.
</p>

<p>
Et cet entre-deux peut être déroutant.
Fatigant.
Parfois même un peu vide.
</p>

<p>
Tu peux avoir l’impression que quelque chose se termine
sans savoir exactement quoi,
ou que quelque chose commence
sans réussir à lui donner une forme.
</p>

<p>
Ce flou n’est pas une erreur.
C’est une zone de passage.
</p>

<p>
On parle rarement de ces moments-là,
parce qu’ils ne sont ni clairs ni spectaculaires.
Ils sont silencieux.
</p>

<p>
Ce soir n’est pas fait pour prendre des décisions.
Ni pour comprendre.
</p>

<p>
Il est fait pour <b>habiter l’entre-deux</b>
sans te juger.
</p>

<p>
Ta soirée idéale ici est simple,
presque suspendue.
</p>

<p>
Pas de grands projets.
Pas de remise en question.
</p>

<p>
Prépare un espace qui te fait te sentir “entre”.
</p>

<p>
Une lumière tamisée.
Un endroit ni trop stimulant, ni trop vide.
</p>

<p>
Choisis quelque chose qui accompagne,
sans diriger :
</p>

<p>
un film lent,
une musique douce,
un carnet où tu peux écrire sans structure,
ou ne rien écrire du tout.
</p>

<p>
Si des pensées surgissent sur l’avenir,
ne cherche pas à les attraper.
</p>

<p>
Elles se poseront quand le moment sera juste.
</p>

<p>
Ce soir, tu n’as pas à avancer.
</p>

<p>
Tu as juste à rester là,
à respirer dans cet espace intermédiaire,
sans t’y coincer.
</p>

<p>
La transition n’est pas un échec de stabilité.
</p>

<p>
C’est souvent le signe
que quelque chose de plus juste
est en train de se préparer,
même si tu ne le vois pas encore.
</p>

<p>
<b>
Tu n’es pas en retard.
Tu es en passage.
</b>
</p>
`,
  "fatigue-mentale": `
<h3>Faire taire le bruit intérieur</h3>

<p>
Ce que tu ressens n’est pas seulement de la fatigue.
</p>

<p>
C’est un trop-plein de pensées,
d’analyses,
de réflexions,
de « il faut »,
de « j’aurais dû »,
de scénarios qui tournent en boucle.
</p>

<p>
Ton corps peut encore tenir,
mais ton esprit, lui,
n’a plus d’espace.
</p>

<p>
Cette fatigue mentale apparaît souvent
quand on pense beaucoup,
quand on anticipe,
quand on essaie de comprendre,
de prévoir,
de ne pas se tromper.
</p>

<p>
Ce soir,
l’objectif n’est pas de trouver des réponses.
</p>

<p>
L’objectif est de <b>créer du silence intérieur</b>,
même imparfait,
même bref.
</p>

<p>
Ta soirée idéale ici commence par une coupure douce.
</p>

<p>
Éloigne ce qui stimule :
les notifications,
les conversations lourdes,
les contenus qui demandent ton attention.
</p>

<p>
Pas besoin de tout éteindre.
Juste assez pour que ton esprit
n’ait plus à réagir.
</p>

<p>
Installe-toi dans un endroit simple.
Lumière tamisée.
Peu de bruit.
Rien à suivre.
</p>

<p>
Choisis une activité répétitive,
presque automatique :
</p>

<p>
plier du linge,
dessiner sans objectif,
marcher lentement,
écouter une musique sans paroles,
regarder quelque chose de très calme.
</p>

<p>
L’idée n’est pas de te concentrer,
mais de <b>laisser ton cerveau se reposer</b>.
</p>

<p>
Si une pensée arrive,
ne la combats pas.
</p>

<p>
Laisse-la passer,
comme un bruit lointain,
sans t’y accrocher.
</p>

<p>
Tu n’as rien à résoudre ce soir.
</p>

<p>
Rien à décider.
Rien à comprendre.
</p>

<p>
Juste à offrir à ton esprit
quelques minutes sans exigence.
</p>

<p>
<b>
Le calme reviendra,
pas parce que tu l’as cherché,
mais parce que tu lui as laissé de la place.
</b>
</p>
`,
 "ancrage-fragile": `
<h3>Consolider sans forcer</h3>

<p>
Malgré tout ce que tu traverses,
il y a quelque chose en toi qui tient encore.
</p>

<p>
Pas de manière héroïque.
Pas de manière spectaculaire.
</p>

<p>
Mais suffisamment pour continuer,
observer,
ressentir,
chercher des espaces comme celui-ci.
</p>

<p>
Ton ancrage est là.
Simplement,
il est fragile.
</p>

<p>
Et fragile ne veut pas dire faible.
</p>

<p>
Cela veut dire sensible aux secousses,
aux attentes,
aux rythmes trop rapides.
</p>

<p>
Ce soir n’est pas là pour te renforcer à tout prix.
</p>

<p>
Il est là pour <b>consolider doucement</b>,
comme on stabilise quelque chose
sans appuyer dessus.
</p>

<p>
Ta soirée idéale ici ressemble à un retour au corps,
mais sans contrainte.
</p>

<p>
Prépare un environnement simple,
rassurant,
prévisible.
</p>

<p>
Les mêmes gestes,
les mêmes objets,
quelque chose de familier.
</p>

<p>
Une boisson chaude que tu aimes.
Un vêtement confortable.
Une routine qui ne demande aucun effort.
</p>

<p>
Choisis une activité qui te recentre
sans te couper de toi :
</p>

<p>
ranger doucement,
marcher lentement,
écouter une musique connue,
respirer plus profondément
sans chercher à contrôler.
</p>

<p>
Si tu sens une fatigue monter,
ne lutte pas.
</p>

<p>
Si tu sens une stabilité revenir,
ne t’y accroche pas.
</p>

<p>
L’ancrage se renforce
quand on le laisse être,
pas quand on l’exige.
</p>

<p>
Ce soir,
tu n’as rien à prouver.
</p>

<p>
Juste à reconnaître
que même fragile,
tu es déjà là.
</p>

<p>
<b>
Et c’est largement suffisant pour aujourd’hui.
</b>
</p>
`,
};

// ===============================
// OUVRIR UNE CARTE
// ===============================
cards.forEach(card => {
  card.addEventListener("click", () => {
    const key = card.dataset.care;

    cardsContainer.classList.add("focus-mode");
    careText.innerHTML = careTexts[key] || "<p>Texte à venir…</p>";
    detailSection.classList.remove("hidden");

    softReturnBtn.classList.add("visible");
    if (backHomeBtn) backHomeBtn.style.display = "none";
  });
});

// ===============================
// RETOUR
// ===============================
softReturnBtn.addEventListener("click", () => {
  detailSection.classList.add("hidden");
  cardsContainer.classList.remove("focus-mode");
  softReturnBtn.classList.remove("visible");
  if (backHomeBtn) backHomeBtn.style.display = "block";
});

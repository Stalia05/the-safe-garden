// ==================
// ÉLÉMENTS HTML
// ==================
const questionText = document.getElementById("questionText");
const answersDiv = document.getElementById("answers");
const backBtn = document.getElementById("backBtn");

// ==================
// QUESTIONS (20)
// ==================
const questions = [
  {
    text: "En ce moment, comment te sens-tu le plus souvent ?",
    answers: [
      { text: "Plutôt calme", tags: ["ancrage_fragile"] },
      { text: "Un peu fatigué·e", tags: ["fatigue_legere"] },
      { text: "Submergé·e", tags: ["fatigue_profonde", "anxiete"] },
      { text: "Je ne sais pas trop", tags: ["confusion"] }
    ]
  },
  {
    text: "Ton niveau d’énergie ces derniers jours est plutôt…",
    answers: [
      { text: "Stable", tags: ["ancrage_fragile"] },
      { text: " Assez bas", tags: ["fatigue_legere"] },
      { text: "Très bas", tags: ["fatigue_profonde"] },
      { text: "Imprévisible", tags: ["epuisement_emotionnel"] }
    ]
  },
  {
    text: "Tes pensées sont généralement…",
    answers: [
      { text: "Claires", tags: ["ancrage_fragile"] },
      { text: "Nombreuses", tags: ["anxiete"] },
      { text: "Envahissantes", tags: ["anxiete", "epuisement_emotionnel"] },
      { text: "Floues", tags: ["confusion"] }
    ]
  },
  {
    text: "Quand tu te réveilles le matin, tu te sens…",
    answers: [
      { text: "Reposé·e", tags: ["ancrage_fragile"] },
      { text: "Fatigué·e", tags: ["fatigue_legere"] },
      { text: "Déjà tendu·e", tags: ["anxiete"] },
      { text: "Sans énergie", tags: ["fatigue_profonde"] }
    ]
  },
  {
    text: "Ton sommeil est plutôt…",
    answers: [
      { text: "Réparateur", tags: ["ancrage_fragile"] },
      { text: "Irrégulier", tags: ["fatigue_legere"] },
      { text: "Difficile", tags: ["anxiete"] },
      { text: "Insuffisant", tags: ["fatigue_profonde"] }
    ]
  },
  {
    text: "Quand quelque chose te pèse, tu as tendance à…",
    answers: [
      { text: "En parler", tags: ["ancrage_fragile"] },
      { text: "Garder pour toi", tags: ["deconnexion"] },
      { text: "Minimiser", tags: ["auto_exigence"] },
      { text: "T’isoler", tags: ["epuisement_emotionnel"] }
    ]
  },
  {
    text: "Ton rapport à toi-même est plutôt…",
    answers: [
      { text: "Bienveillant", tags: ["ancrage_fragile"] },
      { text: "Exigeant", tags: ["auto_exigence"] },
      { text: "Dur", tags: ["auto_exigence", "fatigue_profonde"] },
      { text: "Flou", tags: ["confusion"] }
    ]
  },
  {
    text: "Quand tu ralentis, tu ressens surtout…",
    answers: [
      { text: "Du soulagement", tags: ["transition"] },
      { text: "De l’ennui", tags: ["deconnexion"] },
      { text: "De l’anxiété", tags: ["anxiete"] },
      { text: "De la paix", tags: ["ancrage_fragile"] }
    ]
  },
  {
    text: "Ces derniers temps, tu te sens plutôt…",
    answers: [
      { text: "Aligné·e", tags: ["ancrage_fragile"] },
      { text: "Perdu·e", tags: ["confusion"] },
      { text: "En transition", tags: ["transition"] },
      { text: "En survie", tags: ["epuisement_emotionnel"] }
    ]
  },
  {
    text: "Là, tout de suite, tu te sens…",
    answers: [
      { text: "Présent·e", tags: ["ancrage_fragile"] },
      { text: "Fatigué·e", tags: ["fatigue_profonde"] },
      { text: "Ému·e", tags: ["hypersensibilite"] },
      { text: "Soulagé·e d’être ici", tags: ["transition"] }
    ]
  }
];

// ==================
// BILANS
// ==================
const results = {
 fatigue_legere: `
Cette fatigue n’est pas brutale.
Elle ne t’empêche pas de fonctionner, de travailler, de répondre aux autres.
Mais elle est présente presque tous les jours, souvent en fin de journée,
parfois dès le matin, sans raison évidente.

Tu arrives à faire ce que tu dois faire,
mais avec un léger effort supplémentaire.
Tu repousses un peu le moment de te reposer.
Tu te dis que “ça ira après”, que ce n’est pas si grave,
que d’autres sont plus fatigués que toi.

Cette fatigue apparaît souvent quand le rythme est juste un peu trop soutenu.
Pas assez pour t’arrêter,
mais assez pour t’obliger à te maintenir en permanence.
Ton corps tient,
ton esprit s’adapte,
mais rien ne se recharge complètement.

Il est possible que tu dormes,
mais que ton sommeil ne soit pas toujours réparateur.
Ou que tu te réveilles avec l’impression d’avoir dormi,
sans pour autant te sentir réellement reposé·e.
Ce n’est pas un manque de sommeil évident,
c’est un manque de récupération réelle.

Cette fatigue peut aussi venir d’une accumulation de petites choses :
des responsabilités, des attentes, des décisions à prendre,
des pensées qui ne s’arrêtent jamais complètement.
Rien de dramatique pris séparément,
mais beaucoup de choses mises bout à bout.

Ce bilan ne dit pas que tu vas mal.
Il dit que tu tires un peu sur la corde,
souvent sans t’en rendre compte.
Que tu avances en t’adaptant,
en minimisant ce que tu ressens,
en continuant malgré les signaux discrets de ton corps.

Ce que cette fatigue demande,
ce n’est pas une coupure radicale,
ni un changement brutal.
Elle demande des ajustements simples et réguliers :
des pauses qui ne servent à rien,
des moments sans objectif,
des temps où tu n’as pas besoin d’être efficace.

Ralentir légèrement,
réduire certaines exigences,
t’autoriser à ne pas tout optimiser.
Ce sont souvent ces choix-là
qui empêchent une fatigue légère de devenir plus profonde.
`,
fatigue_profonde: `
Cette fatigue ne passe plus complètement, même après le repos.
Dormir, ralentir quelques heures ou quelques jours ne suffit pas toujours à te redonner de l’énergie.
Tu peux continuer à avancer,
mais souvent en te sentant vidé·e, lourd·e, ou sans véritable élan.

Il est possible que ton corps soit fatigué,
mais cette fatigue dépasse souvent le simple manque de sommeil.
Elle s’installe dans la durée.
Elle affecte la concentration, la motivation,
et parfois même l’envie de faire des choses qui te faisaient du bien auparavant.

Tu peux te lever en étant déjà fatigué·e,
avec l’impression de commencer la journée en retard,
comme si tu devais rattraper une dette d’énergie accumulée depuis longtemps.
Les tâches du quotidien demandent plus d’effort qu’avant,
et tu peux avoir tendance à repousser, éviter, ou fonctionner en mode automatique.

Cette fatigue profonde apparaît souvent après une période prolongée de tension.
Beaucoup de responsabilités,
des émotions mises de côté,
des attentes à tenir,
sans véritables espaces de récupération.
Ton corps et ton esprit ont continué à avancer,
mais sans se recharger suffisamment.

Ce bilan ne dit pas que tu es faible,
ni que tu manques de volonté.
Il indique que tu as probablement trop donné,
trop longtemps,
sans pouvoir t’arrêter réellement.
Tenir a demandé un effort constant,
et aujourd’hui cet effort laisse des traces.

Ce que cette fatigue demande n’est pas seulement du repos ponctuel.
Elle demande un repos différent.
Un repos qui ne cherche pas à “aller mieux rapidement”,
mais qui autorise un vrai ralentissement.
Moins de sollicitations.
Moins d’obligations.
Moins de pression, y compris celle que tu t’imposes.

Ce bilan t’invite à prendre cette fatigue au sérieux,
sans dramatiser,
mais sans la minimiser.
À reconnaître que ton corps te parle,
et qu’il mérite d’être écouté avec attention.
`,
anxiete: `
Cette anxiété ne se manifeste pas toujours par des crises visibles.
Elle est souvent plus discrète, plus constante.
Une tension de fond.
Un état d’alerte qui ne se relâche jamais complètement.

Ton esprit anticipe beaucoup.
Il analyse, prévoit, imagine les scénarios possibles,
souvent pour éviter que quelque chose ne se passe mal.
Même dans les moments calmes, il reste actif,
comme s’il ne savait plus vraiment s’arrêter.

Cette anxiété peut se traduire physiquement.
Une respiration plus courte.
Une mâchoire serrée.
Des épaules tendues.
Un ventre noué sans raison précise.
Ton corps se comporte comme s’il devait rester prêt,
même quand il n’y a pas de danger immédiat.

Il est possible que tu te sentes fatigué·e sans comprendre pourquoi,
ou que tu aies du mal à te détendre complètement.
Le repos existe,
mais il n’est jamais total.
Quelque chose reste toujours en arrière-plan,
comme si lâcher prise n’était pas entièrement sécurisé.

Cette anxiété n’est pas imaginaire.
Elle n’est pas un défaut de caractère.
Elle apparaît souvent quand tu as dû gérer beaucoup,
prendre des responsabilités,
ou rester fort·e dans des contextes incertains.
Ton système s’est habitué à fonctionner en vigilance permanente.

Ce bilan ne te demande pas de contrôler davantage ton anxiété.
Il ne te demande pas non plus de “penser positif”.
Il t’invite à reconnaître que ton corps cherche avant tout de la sécurité.

Ce dont tu pourrais avoir besoin en ce moment,
ce sont des espaces sans enjeu.
Des moments où rien n’est attendu de toi.
Moins de stimulations.
Plus de lenteur.
Et surtout, des situations où ton corps peut, enfin,
se permettre de relâcher un peu la tension.
`,
confusion: `
Cette confusion se manifeste souvent dans des situations simples du quotidien.
Tu peux avoir du mal à savoir par quoi commencer,
même quand les tâches sont claires.
Tu hésites plus longtemps que d’habitude,
tu changes d’avis,
ou tu repousses certaines décisions sans vraiment savoir pourquoi.

Tu peux aussi ressentir une forme d’agacement intérieur.
L’impression de faire des choses “par défaut”,
sans être certain·e que ce soit ce que tu veux vraiment.
Tu avances,
mais sans ressentir de direction nette ni de motivation claire.

Dans ta tête, plusieurs pensées peuvent coexister en même temps.
Des idées, des projets, des obligations,
mais aucune ne prend vraiment le dessus.
Tout semble avoir la même importance,
ce qui rend difficile le fait de choisir ou de prioriser.

Il arrive aussi que tu te sentes vidé·e mentalement.
Non pas parce que tu es fatigué·e physiquement,
mais parce que réfléchir demande trop d’effort.
Tu peux alors éviter de penser,
te distraire,
ou fonctionner en mode automatique pour ne pas avoir à décider.

Cette confusion apparaît souvent quand quelque chose doit changer,
sans que tu saches encore quoi exactement.
Un rythme,
un rôle,
une relation,
ou une manière de fonctionner qui ne te convient plus,
mais que tu n’as pas encore remplacée.

Ce bilan ne dit pas que tu manques de capacités.
Il indique que tu es dans un moment où ton esprit cherche à se réorganiser.
Forcer une réponse maintenant pourrait ajouter de la pression inutile.

Ce dont tu pourrais avoir besoin,
ce n’est pas de clarté immédiate,
mais de réduire le bruit.
Moins de décisions à prendre.
Moins de sollicitations.
Et plus d’espaces simples où tu peux avancer sans avoir à tout comprendre tout de suite.
`,
 hypersensibilite: `
Tu ressens les choses plus intensément que beaucoup de personnes.
Les émotions, les ambiances, les paroles, les regards
ne te traversent pas simplement : ils te marquent.

Dans des situations sociales, par exemple,
un ton un peu sec, une remarque maladroite,
ou une tension dans l’air peuvent t’affecter bien plus que tu ne le voudrais.
Même si rien n’est dit clairement,
tu captes les non-dits,
ce qui peut te laisser épuisé·e après des échanges pourtant banals.

Ton corps réagit aussi fortement aux stimulations.
Le bruit, la lumière, les lieux trop animés,
ou les journées très chargées peuvent rapidement te fatiguer.
Après un moment dans un environnement dense,
tu peux ressentir un besoin urgent de calme et de solitude pour récupérer.

Cette sensibilité peut également te rendre très réceptif·ve aux émotions des autres.
Tu peux absorber leur stress, leur tristesse ou leur agitation,
même quand tu essaies de t’en protéger.
Il arrive alors que tu te sentes mal sans savoir si cela vient vraiment de toi.

Dans ton quotidien, cela peut se traduire par des réactions émotionnelles fortes.
Pleurer plus facilement.
Te sentir touché·e longtemps par une situation.
Ressasser une conversation ou un événement,
là où d’autres passeraient rapidement à autre chose.

Ce bilan ne dit pas que tu es trop sensible.
Il dit que ton système perçoit plus d’informations à la fois.
Cette sensibilité est une capacité réelle,
mais elle demande des conditions adaptées pour ne pas devenir envahissante.

Ce dont tu pourrais avoir besoin,
ce sont des limites plus claires.
Choisir avec soin les environnements que tu fréquentes.
T’accorder des temps de récupération après les interactions.
Et accepter que prendre soin de ta sensibilité
n’est pas une faiblesse,
mais une nécessité.
`,

auto_exigence: `
Tu te demandes beaucoup.
Souvent plus que ce que tu demandes aux autres.
Tu as des standards élevés,
et même quand tu fais de ton mieux,
tu as rarement l’impression que c’est suffisant.

Dans le quotidien, cela peut se traduire par une pression constante.
Tu veux bien faire,
ne pas te tromper,
ne pas décevoir.
Une tâche simple peut devenir lourde,
parce que tu veux qu’elle soit faite correctement,
voire parfaitement.

Il est possible que tu aies du mal à t’arrêter.
Même quand tu te reposes,
une partie de toi continue de penser à ce que tu aurais dû faire autrement.
Les erreurs, petites ou grandes,
peuvent rester longtemps dans ta tête,
alors que tes réussites passent plus vite.

Cette auto-exigence se manifeste aussi dans ton discours intérieur.
Tu peux te parler durement,
te reprocher de ne pas aller assez vite,
de ne pas être assez efficace,
ou de ne pas gérer aussi bien que tu le devrais.
Ce ton intérieur peut devenir épuisant à la longue.

Souvent, cette exigence vient d’un désir sincère de bien faire.
De répondre aux attentes,
d’être à la hauteur,
de ne pas être un poids pour les autres.
Mais à force de te demander toujours plus,
tu peux finir par t’oublier.

Ce bilan ne te reproche rien.
Il met simplement en lumière un fonctionnement
qui t’aide à avancer,
mais qui peut aussi t’user.
Te demander moins n’est pas renoncer.
C’est parfois la seule manière de durer sans t’épuiser.
`,

epuisement_emotionnel: `
Tu donnes beaucoup sur le plan émotionnel.
Tu écoutes, tu soutiens, tu encaisses.
Même quand tu es fatigué·e, tu continues à être présent·e pour les autres,
souvent en mettant tes propres besoins de côté.

Avec le temps, quelque chose s’est vidé.
Les émotions sont toujours là,
mais elles demandent un effort.
Ce qui te touchait avant peut aujourd’hui te sembler lourd,
ou au contraire te laisser étrangement indifférent·e.

Dans le quotidien, cela peut se traduire par une perte d’élan.
Des difficultés à ressentir de la motivation,
moins d’envie d’échanger,
le besoin de t’isoler après des interactions pourtant normales.
Parler, répondre, expliquer peut devenir fatigant en soi.

Tu peux aussi ressentir une saturation émotionnelle.
La moindre demande supplémentaire te semble trop lourde.
Tu peux avoir envie de disparaître un moment,
non pas parce que tu vas mal,
mais parce que tu n’as plus l’énergie émotionnelle nécessaire pour continuer à donner.

Cet épuisement apparaît souvent après une période prolongée
où tu as dû être fort·e,
disponible,
ou responsable pour d’autres.
Tu as tenu,
mais sans espace suffisant pour te recharger.

Ce bilan ne dit pas que tu es froid·e ou distant·e.
Il indique que tes ressources émotionnelles sont basses.
Ce dont tu pourrais avoir besoin,
ce n’est pas de faire plus,
mais de recevoir.
De poser des limites.
Et de te permettre de ne pas être toujours disponible.
`,
deconnexion: `
Cette déconnexion se manifeste souvent sans que tu t’en rendes compte.
Tu fais les choses,
tu réponds,
tu avances,
mais avec une sensation de distance intérieure,
comme si tu n’étais pas complètement là.

Dans le quotidien, tu peux avoir l’impression de fonctionner en pilote automatique.
Les journées passent,
les actions s’enchaînent,
mais sans véritable présence.
Tu fais ce qu’il faut faire,
sans vraiment ressentir ce que tu fais.

Tu peux aussi remarquer une difficulté à identifier tes émotions.
Quand on te demande comment tu vas,
la réponse ne vient pas clairement.
Non pas parce que tout va bien,
mais parce que tu as perdu l’habitude de te poser la question.

Cette déconnexion apparaît souvent comme une protection.
Quand les émotions sont trop intenses,
trop nombreuses,
ou trop lourdes à gérer,
ton esprit crée une distance pour te permettre de continuer.
Ce n’est pas un échec,
c’est une stratégie.

Dans les relations,
cela peut se traduire par un retrait.
Tu écoutes,
mais sans être vraiment impliqué·e.
Tu participes,
mais sans te sentir concerné·e.
Après coup,
tu peux ressentir un vide ou une fatigue difficile à expliquer.

Ce bilan ne dit pas que tu es absent·e ou indifférent·e.
Il indique que tu as probablement eu besoin de te couper pour tenir.
Ce dont tu pourrais avoir besoin,
ce n’est pas de te forcer à ressentir,
mais de recréer du lien progressivement,
à ton rythme,
sans pression.
`,

transition: `
Quelque chose est en train de changer dans ta manière de vivre, de penser ou de te projeter.
Ce changement n’est pas encore clairement défini,
mais il est suffisamment présent pour que l’ancien ne fonctionne plus comme avant.

Dans le quotidien, cela peut se traduire par un sentiment de décalage.
Des habitudes qui te convenaient auparavant te semblent désormais lourdes ou inutiles.
Des objectifs qui te motivaient ne produisent plus le même élan.
Tu continues peut-être par automatisme,
sans te reconnaître complètement dans ce que tu fais.

Cette période peut être inconfortable,
car tu ne peux pas revenir en arrière,
et tu ne sais pas encore où aller.
Tu peux hésiter,
douter,
changer d’avis,
non par instabilité,
mais parce que ton système est en train de se réorganiser.

Il est possible que tu ressentes à la fois de l’envie et de la peur.
L’envie que quelque chose de nouveau émerge,
et la peur de lâcher ce que tu connais déjà.
Ce tiraillement est fréquent dans les phases de transition réelles.

Ce bilan ne te demande pas de décider maintenant.
Il reconnaît que tu es dans un passage.
Un moment où tu ajustes,
où tu observes,
où tu testes intérieurement ce qui te conviendrait davantage.

Ce dont tu pourrais avoir besoin,
ce n’est pas de certitudes immédiates,
mais de temps.
De patience envers toi-même.
Et de la permission d’avancer par petites étapes,
sans te presser de définir ce qui n’est pas encore prêt.
`,
ancrage_fragile: `
Malgré les variations d’énergie et d’humeur, tu arrives à tenir.
Tu n’es pas complètement débordé·e,
et tu conserves une certaine capacité à avancer,
à réfléchir,
à te recentrer quand c’est nécessaire.

Dans le quotidien, cela peut se manifester par des moments de clarté.
Tu sais parfois ce qui te fait du bien.
Tu arrives à t’écouter,
à poser des limites,
ou à ralentir quand tu sens que ça devient trop.
Mais cette stabilité demande un effort conscient.

Cet ancrage reste fragile.
Il peut vaciller quand la fatigue s’accumule,
quand les sollicitations augmentent,
ou quand tu n’as plus assez d’espaces pour toi.
Ce qui te stabilise fonctionne,
mais pas en continu,
et pas sans entretien.

Tu peux alterner entre des phases où tu te sens présent·e,
aligné·e,
et d’autres où tout devient plus flou.
Ce n’est pas une régression.
C’est le signe que ton équilibre est en construction,
pas encore totalement automatisé.

Ce bilan met en lumière une capacité réelle :
celle de t’observer,
de t’ajuster,
et de ne pas ignorer complètement tes signaux internes.
C’est une force importante,
même si elle ne te protège pas de tout.

Ce dont cet ancrage a besoin pour se renforcer,
ce sont des repères réguliers.
Des habitudes simples.
Des temps de pause respectés.
Et surtout, la continuité.
Ce n’est pas l’intensité qui stabilise,
mais la répétition de petits gestes qui te soutiennent.
`,
};
// ==================
// ÉTAT
// ==================
let current = 0;
let history = [];
let tagCount = {};

// ==================
// AFFICHER QUESTION
// ==================
function showQuestion() {
  const q = questions[current];
  questionText.textContent = q.text;
  answersDiv.innerHTML = "";

  q.answers.forEach(answer => {
    const btn = document.createElement("button");
    btn.textContent = answer.text;

    btn.onclick = () => {
      history.push({ index: current, tags: answer.tags });
      answer.tags.forEach(tag => {
        tagCount[tag] = (tagCount[tag] || 0) + 1;
      });
      current++;
      current < questions.length ? showQuestion() : showTransition();
    };

    answersDiv.appendChild(btn);
  });

  backBtn.style.display = history.length ? "block" : "none";
}

// ==================
// TRANSITION
// ==================
function showTransition() {
  questionText.textContent = "Merci d’avoir pris ce temps pour toi 💚";
  answersDiv.innerHTML = `<p style="text-align:center;">Ton bilan se prépare doucement…</p>`;
  backBtn.style.display = "none";

  setTimeout(showResult, 3000);
}

// ==================
// RÉSULTAT
// ==================
function showResult() {
  const dominant = Object.keys(tagCount).reduce((a, b) =>
    tagCount[a] > tagCount[b] ? a : b
  );

  questionText.textContent = "Ton bilan personnalisé";
  answersDiv.innerHTML = `<p>${results[dominant]}</p>`;
}

// ==================
// RETOUR
// ==================
backBtn.onclick = () => {
  if (!history.length) return;

  const last = history.pop();
  current = last.index;

  tagCount = {};
  history.forEach(h => {
    h.tags.forEach(tag => {
      tagCount[tag] = (tagCount[tag] || 0) + 1;
    });
  });

  showQuestion();
};

// ==================
// LANCEMENT
// ==================
showQuestion();

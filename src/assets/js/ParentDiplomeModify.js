function modf(x, id, ide) {
	var counter = document.getElementById("counterCP");
	var div = document.getElementById("updatePC");
	var des = document.getElementById("des" + x).innerText;
	var nom = document.getElementById("nom" + x).innerText;
	var num = document.getElementById("num" + x).innerText;
	var desf = document.getElementById("descp");
	var nomf = document.getElementById("namecp");
	var numf = document.getElementById("numcp");
	desf.value = des;
	nomf.value = nom;
	numf.value = num;
	div.style.display = "block";
	counter.innerHTML = x;
	document.getElementById("idCP").value = id;
	document.getElementById("idECP").value = ide;
}
function updateCP() {
	var x = document.getElementById("counterCP").innerHTML;
	var div = document.getElementById("updatePC");
	var des = document.getElementById("des" + x);
	var nom = document.getElementById("nom" + x);
	var num = document.getElementById("num" + x);
	var desf = document.getElementById("descp").value;
	var nomf = document.getElementById("namecp").value;
	var numf = document.getElementById("numcp").value;
	des.innerText = desf;
	nom.innerText = nomf;
	num.innerText = numf;
	var id = document.getElementById("idCP").value;
	var ide = document.getElementById("idECP").value;
	div.style.display = "none";
	sendCP(id, ide, numf, nomf, desf);
}
function sendCP(id, ide, num, nom, des) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200)
			;
	};
	var url = "../ModifierContacteParent?idCP=" + id + "&ide=" + ide
			+ "&numeroCP=" + num + "&nomCP=" + nom + "&designantionCP=" + des;
	xhttp.open("GET", encodeURI(url), true);
	xhttp.send();
}
var counterAC;
function ModifDiplomeAncien(x, id, ide) {
	var nomdiplome = document.getElementById("nomdiplome" + x);
	var anneediplome = document.getElementById("anneediplome" + x).innerText;
	var specialitediplome = document.getElementById("specialitediplome" + x).innerText;
	var niveaudiplome = document.getElementById("niveaudiplome" + x).innerText;
	var statusdiplome = document.getElementById("statusdiplome" + x).innerText;
	var etablissementdiplome = document.getElementById("etablissementdiplome"
			+ x).innerText;
	var DiplomeAC = document.getElementById("DiplomeAC");
	var anneeac = document.getElementById("anneeac");
	var SpecialiteAC = document.getElementById("SpecialiteAC");
	var NiveauAC = document.getElementById("NiveauAC");
	var StatusAC = document.getElementById("StatusAC");
	var etablissementAC = document.getElementById("etablissementAC");
	counterAC = x;
	var div = document.getElementById("updateAC");
	DiplomeAC.selectedIndex = nomdiplome.value;
	anneeac.value = anneediplome;
	SpecialiteAC.value = specialitediplome;
	NiveauAC.value = niveaudiplome;
	StatusAC.value = statusdiplome;
	etablissementAC.value = etablissementdiplome;
	id=id;
	ide=ide;
	document.getElementById("iddiplomeEtudiant").value = id;
	div.style.display = "block";
}
function updateDA() {
	var div = document.getElementById("updateAC");
	var x = counterAC;
	var DiplomeAC = document.getElementById("DiplomeAC");
	var anneeac = document.getElementById("anneeac").value;
	var SpecialiteAC = document.getElementById("SpecialiteAC").value;
	var NiveauAC = document.getElementById("NiveauAC").value;
	var StatusAC = document.getElementById("StatusAC").value;
	var etablissementAC = document.getElementById("etablissementAC").value;
	var nomdiplome = document.getElementById("nomdiplome" + x);
	var anneediplome = document.getElementById("anneediplome" + x);
	var specialitediplome = document.getElementById("specialitediplome" + x);
	var niveaudiplome = document.getElementById("niveaudiplome" + x);
	var statusdiplome = document.getElementById("statusdiplome" + x);
	var etablissementdiplome = document.getElementById("etablissementdiplome"
			+ x);
	nomdiplome.innerText = DiplomeAC.options[DiplomeAC.selectedIndex].text;
	anneediplome.innerText=anneeac;
	specialitediplome.innerText = SpecialiteAC;
	niveaudiplome.innerText = NiveauAC;
	statusdiplome.innerText = StatusAC;
	etablissementdiplome.innerText = etablissementAC;
	div.style.display = "none";
	
	sendAD(document.getElementById("iddiplomeEtudiant").value, DiplomeAC.value ,document.getElementById("idetudiant").value, anneeac, SpecialiteAC, NiveauAC, StatusAC, etablissementAC);
}
function sendAD(id, idDiplome, idEtudiant, annee, specialite, niveau, status, etablissement) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200)
			;
	};
	var url = "../ModifierDiplome?id=" + id + "&idEtudiant=" + idEtudiant
			+ "&idDiplome=" + idDiplome + "&annee=" + annee + "&specialite=" + specialite + "&niveau=" + niveau + "&status=" + status + "&etablissement=" + etablissement;
	xhttp.open("GET", encodeURI(url), true);
	xhttp.send();
}


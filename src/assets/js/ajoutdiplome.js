var j = 1;

function newselect(n, inh) {
    var select = document.createElement("select");
    select.className = "form-control form-control-alternative";
    select.name = n;
    select.innerHTML = inh;
    return select;
}

function newlabel(i) {
    var label = document.createElement("label");
    label.className = "form-control-label";
    label.innerHTML = i;
    return label;
}

function newinput(t, p, n) {
    var input = document.createElement("input");
    input.className = "form-control form-control-alternative";
    input.type = t;
    input.placeholder = p;
    input.name = n;
    return input;
}

function newline() {
    var line = document.createElement("div");
    line.className = "row";
    line.innerHTML = document.getElementById("newline").innerHTML;
    return line;
}

function rowlg12(lab, inn) {
    var row = document.createElement("div");
    var collg12 = document.createElement("div");
    var formgr = document.createElement("div");
    row.className = "row";
    collg12.className = "col-lg-12";
    formgr.appendChild(lab);
    formgr.appendChild(inn);
    collg12.appendChild(formgr);
    row.appendChild(collg12);
    return row;
}

function rowlg6(lab, inn) {
    var row = document.createElement("div");
    var collg6 = document.createElement("div");
    var formgr = document.createElement("div");
    row.className = "row";
    collg6.className = "col-lg-6";
    formgr.appendChild(lab);
    formgr.appendChild(inn);
    collg6.appendChild(formgr);
    row.appendChild(collg6);
    return row;
}

function gl6n(lab, inn) {
    var collg6 = document.createElement("div");
    var formgr = document.createElement("div");
    collg6.className = "col-lg-6";
    formgr.appendChild(lab);
    formgr.appendChild(inn);
    collg6.appendChild(formgr);
    return collg6;
}

function AddDiplome() {
    var head = document.getElementById("wnew");
    var row = document.createElement("div");
    var collg12 = document.createElement("div");
    var collg6 = document.createElement("div");
    var formgr = document.createElement("div");
    var slctd = newselect("Diplome" + j, document.getElementById("slctd").innerHTML);
    var slctnv = newselect("niveaud" + j, document.getElementById("slctnv").innerHTML);
    var slctstt = newselect("statusd" + j, document.getElementById("slctstt").innerHTML);
    var lbldiplome = newlabel("Diplome");
    var lblspecialite = newlabel("Specialité");
    var lblanne = newlabel("Année du diplome");
    var lblnv = newlabel("Niveau");
    var lblstt = newlabel("Status");
    var lbletab = newlabel("Établissement");
    var div61 = rowlg6(lblspecialite, newinput("text", "Specialité", "specialited" + j));
    var div62 = rowlg6(lblnv, slctnv);
    var countdip = document.getElementById("countdiplome");
    row.className = "row";
    collg12.className = "col-lg-12";
    collg6.className = "col-lg-6";
    formgr.className = "form-group";
    head.appendChild(rowlg12(lbldiplome, slctd));
    div61.appendChild(gl6n(lblanne, newinput("number", "Année du diplome", "anneed" + j)))
    head.appendChild(div61);
    div62.appendChild(gl6n(lblstt, slctstt));
    head.appendChild(div62);
    head.appendChild(rowlg6(lbletab, newinput("text", "Établissement du diplome", "etablissementd" + j)));
    head.appendChild(newline());
    j=j+1;
    countdip.value=j;
}
var k = 1;
function getCount(){
	var pcont = document.getElementById("CountParCont");
	pcont.value=k;
}

function newlabel(lab) {
    var label = document.createElement("label");
    label.className = "form-control-label";
    label.innerHTML = lab;
    return label;
}

function newinput(type, placeholder, name) {
    var input = document.createElement("input");
    input.className = "form-control form-control-alternative";
    input.type = type;
    input.placeholder = placeholder;
    input.name = name;
    return input;
}

function newline() {
    var line = document.createElement("div");
    line.className = "row";
    return line;
}

function colmd12() {
    var col12 = document.createElement("div");
    col12.className = "col-md-12";
    return col12;
}

function formgroup() {
    var grform = document.createElement("div");
    grform.className = "form-group";
    return grform;
}

function collg6() {
    var col6 = document.createElement("div");
    col6.className = "col-lg-6";
    return col6;
}

function md12() {
    //var row1 = newline();
    var row1 = document.createElement("div");
    row1.className = "row";
    var md12 = colmd12();
    var frgr1 = formgroup();
    var lab = newlabel("Designation");
    var inp = newinput("text", "Designation", "desip" + k);
    frgr1.appendChild(lab);
    frgr1.appendChild(inp);
    md12.appendChild(frgr1);
    row1.appendChild(md12);
    return row1;
}

function co6(lab, intype, inplace, inname) {
    var col6 = collg6();
    var frgr1 = formgroup();
    var lab = newlabel(lab);
    var inp = newinput(intype, inplace, inname);
    frgr1.appendChild(lab);
    frgr1.appendChild(inp);
    col6.appendChild(frgr1);
    return col6;
}

function cl4() {
    var col4 = document.createElement("div");
    col4.className = "col-lg-4";
    return col4;
}

function sup() {
    var row = document.createElement("div");
    row.className="row";
    var c41 = cl4();
    var c42 = cl4();
    var c43 = cl4();
    var sup = document.createElement("hr");
    sup.className = "my-4";
    c42.appendChild(sup);
    row.appendChild(c41);
    row.appendChild(c42);
    row.appendChild(c43);
    return row;
}

function addParentCont() {
    var head = document.getElementById("cntP");
    var m12 = md12();
    var col61 = co6("Nom & Prénom", "text", "Nom", "nomp" + k);
    var col62 = co6("Téléphone", "text", "Téléphone", "nump" + k);
    var row = document.createElement("div");
    row.className = "row";
	var seperator = sup();
	head.appendChild(seperator);
    head.appendChild(m12);
    row.appendChild(col61);
    row.appendChild(col62);
    head.appendChild(row);
    k = k + 1;
    getCount();
}
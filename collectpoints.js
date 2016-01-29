function getintermediatepts(pq, rs, k) {
    console.log('getintermediatepts called');
    var p = pq[0];
    var q = pq[1];
    var r = rs[0];
    var s = rs[1];
    var dis = (r - p) * (r - p) + (s - q) * (s - q);
    //alert(dis);
    if (k * k >= (r - p) * (r - p) + (s - q) * (s - q))
        return;
    var a = (s - q) / (r - p);
    var b = q - a * p;
    var det_b = 2 * a * (b - q) - 2 * p;
    var det_c = p * p + (b - q) * (b - q) - k * k;
    var det_a = (1 + a * a);
    var x1 = ((-1 * det_b) + Math.sqrt((det_b * det_b) - (4 * det_a * det_c))) / (2 * det_a);
    var x2 = ((-1 * det_b) - Math.sqrt((det_b * det_b) - (4 * det_a * det_c))) / (2 * det_a);
    if (x1 >= p && x1 <= r) {
        var temp = [x1, a * x1 + b];
        intermediatePoints.push(temp);
        //alert(x1);// + "," + a*x1+b);
    } else {
        var temp1 = [x2, a * x2 + b];
        intermediatePoints.push(temp1);
        //alert(x2 + "," + a*x2+b);
    }
    getintermediatepts(pq, rs, k + factor);
}
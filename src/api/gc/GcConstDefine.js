const PrintServiceUrl = {
    Bbox : "http://127.0.0.1:10010/Integration/wms-print-bbox/Execute",
    Vbox : "http://127.0.0.1:10011/Integration/wms-print-vbox/Execute",
    WltBbox : "http://127.0.0.1:10012/Integration/wms-print-wltbbox/Execute",
    WltBox : "http://127.0.0.1:10013/Integration/wms-print-wltBox/Execute",
    BoxQRCode : "http://127.0.0.1:10014/Integration/wms-print-BoxQRCode/Execute",
    ObliqueBox :  "http://127.0.0.1:10016/Integration/wms-print-ObliqueBox/Execute",
    WltLotId :  "http://127.0.0.1:10017/Integration/wms-print-WltOrCpBox/Execute",
    COBBox : "http://127.0.0.1:10018/Integration/wms-print-COBBox/Execute",
    RmaMLotId :  "http://127.0.0.1:10019/Integration/wms-print-RmaBox/Execute",
}
const PrintBboxCount = 2;
export {PrintServiceUrl, PrintBboxCount}
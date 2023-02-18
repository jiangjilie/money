function Preview() {
    document.all.factory.printing.Preview();

}

function Print() {
    document.all.factory.printing.Print(false); //无确认打印，true时打印前需进行确认

}

function PrintSetup() {
    document.all.factory.printing.PageSetup();

}

function SetPrintSettings(isportrait) {
    // -------------------基本功能，可免费使用-----------------------
    document.all.factory.printing.header = ""; //页眉
    document.all.factory.printing.footer = ""; //页脚
    ////document.all.factory.printing.SetMarginMeasure(1); //页边距单位，1为毫米，2为英寸//边距设置，需要注意大部分打印机都不能进行零边距打印，即有一个边距的最小值，一般是6毫米以上
    //设置边距的时候时候如果设置为零，就会自动调整为它的最小边距
    document.all.factory.printing.leftMargin = 0; //左边距
    document.all.factory.printing.topMargin = 0; //上边距
    document.all.factory.printing.rightMargin = 0; //右边距
    document.all.factory.printing.bottomMargin = 0; //下边距
    document.all.factory.printing.portrait = isportrait; //是否纵向打印，横向打印为false
    document.all.factory.printing.Print(false);
    //--------------------高级功能---------------------------------------------
    //document.all.factory.printing.printer = "EPSON LQ-1600KIII"; //指定使用的打印机
    //document.all.factory.printing.printer = "\\\\cosa-data\\HPLaserJ";//如为网络打印机，则需要进行字符转义
    ////document.all.factory.printing.paperSize = "A4"; //指定使用的纸张
    document.all.factory.printing.paperSource = "Manual feed"; //进纸方式，这里是手动进纸
    ////document.all.factory.printing.copies = 1; //打印份数
    ////document.all.factory.printing.printBackground = false; //是否打印背景图片
    ////document.all.factory.printing.SetPageRange(false, 1, 3); //打印1至3页
    //---------------------常用函数--------------------------------
     //无确认打印，true时打印前需进行确认
    //document.all.factory.printing.PrintSetup(); //打印设置
    //document.all.factory.printing.Preview(); //打印预览
    //document.all.factory.printing.WaitForSpoolingComplete(); //等待上一个打印任务完全送入打印池，在连续无确认打印时非常有用
    //document.all.factory.printing.EnumPrinters(index); //枚举已安装的所有打印机，主要用于生成打印机选择功能

}  

// <script type="text/javascript">
// 	        var IE = false;
// 	        $(document).ready(function () {
// 	            var imgsrc = $.getUrlParam("imgsrc");
// 	            var sy = $.getUrlParam("sy");//sy是否添加水印(0:否，1:是)
// 	            oldurl = imgsrc;
// 	            $("#imgpanel").attr("src", imgsrc);
// 	            if (sy == 1) {
// 	                document.getElementById("sydiv").innerText = "不得复制";
// 	            }
// 	            IE = isIE();
// 	            GetImageInfo();
// 	        });
	
// 	        function PrintImg(isprintit) {
// 	            SetPrintSettings(false);
// 	        }
	
	
// 	        var printdiraction;
// 	        var t;
// 	        var vcount = 0;
// 	        var oldurl = "";
// 	        var imgresize = 680;
// 	        var img;
// 	        var isload = false;
	
// 	        function GetImageInfo() {
// 	            var imgwidth = $.getUrlParam("width");
// 	            var imgheight = $.getUrlParam("height");
// 	            var syx = 0, syy = 0;
// 	            if (imgheight < imgwidth) {
// 	                printdiraction = true;
// 	                var pHeight = imgresize;
// 	                var pWidth = imgwidth * 1000 * (pHeight / imgheight) / 1000;
	
// 	                $("#imgpanel").css("height", pHeight + "px");
// 	                $("#imgpanel").css("width", pWidth + "px");
// 	            }
// 	            else {
// 	                printdiraction = false;
// 	                var pWidth = imgresize;
// 	                var pHeight = imgheight * 1000 * (pWidth / imgwidth) / 1000;
// 	                $("#imgpanel").css("height", pHeight + "px");
// 	                $("#imgpanel").css("width", pWidth + "px");
// 	            }
// 	            var syel = document.getElementById("sydiv");
// 	            var strsyfontsiz = syel.style.fontSize;
// 	            var syfontsiz = parseInt(strsyfontsiz);
// 	            var len = syel.innerText.length;
// 	            sywidth = syfontsiz * len + 1;
// 	            syheight = syfontsiz + 1;
// 	            syx = (pWidth - sywidth) / 2;
// 	            syy = (pHeight - syheight) / 2;
// 	            $("#sydiv").css("margin-left", syx);
// 	            $("#sydiv").css("margin-top", syy);
// 	            //oDragObj.style.top = 0;
// 	            //oDragObj.style.left = 0;
// 	        }
	
	
// 	        function GetImgInfo() {
// 	            // 图片地址 后面加时间戳是为了避免缓存
// 	            var img_url = oldurl;
// 	            // 创建对象
// 	            img = new Image();
// 	            // 改变图片的src
// 	            img.src = img_url;
// 	            var el = document.getElementById("imgpanel");
// 	            el.style.top = 0;
// 	            el.style.left = 0;
// 	            if (img.complete) {
// 	                if (img.height < img.width) {
// 	                    printdiraction = true;
// 	                    var pHeight = imgresize;
// 	                    var pWidth = img.width * 1000 * (pHeight / img.height) / 1000;
// 	                    $("#imgpanel").css("height", pHeight + "px");
// 	                    $("#imgpanel").css("width", pWidth + "px");
// 	                }
// 	                else {
// 	                    printdiraction = false;
// 	                    var pWidth = imgresize;
// 	                    var pHeight = img.height * 1000 * (pWidth / img.width) / 1000;
// 	                    $("#imgpanel").css("height", pHeight + "px");
// 	                    $("#imgpanel").css("width", pWidth + "px");
// 	                }
// 	                isload = true;
// 	                el.src = oldurl;
// 	            }
// 	            if (!isload) {
// 	                img.onload = function () {
// 	                    if (img.height < img.width) {
// 	                        printdiraction = true;
// 	                        var pHeight = imgresize;
// 	                        var pWidth = img.width * 1000 * (pHeight / img.height) / 1000;
// 	                        $("#imgpanel").css("height", pHeight + "px");
// 	                        $("#imgpanel").css("width", pWidth + "px");
// 	                    }
// 	                    else {
// 	                        printdiraction = false;
// 	                        var pWidth = imgresize;
// 	                        var pHeight = img.height * 1000 * (pWidth / img.width) / 1000;
// 	                        $("#imgpanel").css("height", pHeight + "px");
// 	                        $("#imgpanel").css("width", pWidth + "px");
// 	                    }
// 	                    isload = true;
// 	                    el.src = oldurl;
// 	                }
// 	            }
// 	        }
	
// 	        function imgPrint() {
// 	            GetImageInfo();
// 	            var IEv = IEVersion();
// 	            if (IEv == -1) {
// 	                $("#imgpanel").jqprint({
// 	                    debug: false, //如果是true则可以显示iframe查看效果（iframe默认高和宽都很小，可以再源码中调大），默认是false
// 	                    importCSS: true, //true表示引进原来的页面的css，默认是true。（如果是true，先会找$("link[media=print]")，若没有会去找$("link")中的css文件）
// 	                    printContainer: true, //表示如果原来选择的对象必须被纳入打印（注意：设置为false可能会打破你的CSS规则）。
// 	                    operaSupport: false,//表示如果插件也必须支持歌opera浏览器，在这种情况下，它提供了建立一个临时的打印选项卡。默认是true
// 	                    portrait: printdiraction
// 	                });
// 	            }
// 	            else {
// 	                SetPrintSettings(!printdiraction);
// 	            }
// 	        }
// 	    </script>
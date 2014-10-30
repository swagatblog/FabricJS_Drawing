/*
Author: SWAGAT PARIDA
*/  

        var copiedObject;
        var copiedObjects = new Array();
        var canvasScale = 1;
        var SCALE_FACTOR = 1.2;
        var src = window.location.href.replace('index.html','') + '/test.jpg';
        var canvas = new fabric.Canvas('canvas', {
            isDrawingMode: false
        });
        var onload = function () {

            fabric.Image.fromURL(src, function (oImg) {
                canvas.add(oImg);
            });
        };

        var onSolidCircle = function () {
            canvas.add(new fabric.Circle({ radius: 30, fill: '#f55', top: 150, left: 150 }));
        }

        var onSolidRect = function () {
            var rect = new fabric.Rect({
                top: 100,
                left: 100,
                width: 60,
                height: 70,
                fill: '',
                selection: false,
                fill: '#f55'
            });

            canvas.add(rect);
        }

        var onStartDrawing = function () {
            canvas.isDrawingMode = true;
        }

        var onStopDrawing = function () {
            canvas.isDrawingMode = false;
        }

        var onZoomIn = function () {
            // TODO limit the max canvas zoom in

            canvasScale = canvasScale * SCALE_FACTOR;

            canvas.setHeight(canvas.getHeight() * SCALE_FACTOR);
            canvas.setWidth(canvas.getWidth() * SCALE_FACTOR);

            var objects = canvas.getObjects();
            for (var i in objects) {
                var scaleX = objects[i].scaleX;
                var scaleY = objects[i].scaleY;
                var left = objects[i].left;
                var top = objects[i].top;

                var tempScaleX = scaleX * SCALE_FACTOR;
                var tempScaleY = scaleY * SCALE_FACTOR;
                var tempLeft = left * SCALE_FACTOR;
                var tempTop = top * SCALE_FACTOR;

                objects[i].scaleX = tempScaleX;
                objects[i].scaleY = tempScaleY;
                objects[i].left = tempLeft;
                objects[i].top = tempTop;

                objects[i].setCoords();
            }

            canvas.renderAll();
        }

        var onZoomOut = function () {
            canvasScale = canvasScale / SCALE_FACTOR;

            canvas.setHeight(canvas.getHeight() * (1 / SCALE_FACTOR));
            canvas.setWidth(canvas.getWidth() * (1 / SCALE_FACTOR));

            var objects = canvas.getObjects();
            for (var i in objects) {
                var scaleX = objects[i].scaleX;
                var scaleY = objects[i].scaleY;
                var left = objects[i].left;
                var top = objects[i].top;

                var tempScaleX = scaleX * (1 / SCALE_FACTOR);
                var tempScaleY = scaleY * (1 / SCALE_FACTOR);
                var tempLeft = left * (1 / SCALE_FACTOR);
                var tempTop = top * (1 / SCALE_FACTOR);

                objects[i].scaleX = tempScaleX;
                objects[i].scaleY = tempScaleY;
                objects[i].left = tempLeft;
                objects[i].top = tempTop;

                objects[i].setCoords();
            }

            canvas.renderAll();
        }

        var onResetZoom = function () {

            canvas.setHeight(canvas.getHeight() * (1 / canvasScale));
            canvas.setWidth(canvas.getWidth() * (1 / canvasScale));

            var objects = canvas.getObjects();
            for (var i in objects) {
                var scaleX = objects[i].scaleX;
                var scaleY = objects[i].scaleY;
                var left = objects[i].left;
                var top = objects[i].top;

                var tempScaleX = scaleX * (1 / canvasScale);
                var tempScaleY = scaleY * (1 / canvasScale);
                var tempLeft = left * (1 / canvasScale);
                var tempTop = top * (1 / canvasScale);

                objects[i].scaleX = tempScaleX;
                objects[i].scaleY = tempScaleY;
                objects[i].left = tempLeft;
                objects[i].top = tempTop;

                objects[i].setCoords();
            }

            canvas.renderAll();

            canvasScale = 1;
        }
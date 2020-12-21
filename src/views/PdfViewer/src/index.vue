<template>
  <div class="file-reader-pdf" style="height:100%;width:100%;display:flex;flex-direction: column;">
    <toolbar
      v-if="!error"
      class="file-reader__toolbar file-reader-pdf__toolbar"
      :pdfViewer="pdfViewer"
      :parent="parent"
    />
    <div class="file-reader-pdf__main">
      <pdf-sidebar
        v-if="!error && sidebar"
        :pdfViewer="pdfViewer"
        :parent="parent"
        :pdfDocument="pdfDocument"
      />
      <div style="position:relative;height:100%;width:100%">
        <div ref="container" class="file-reader-pdf__main-viewer">
          <div id="viewer" class="pdfViewer"></div>
          <div v-if="error" style="padding:20px;font-size:14px;color:#FE5068">文件格式错误或资源不存在！</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PDFJS from "pdfjs-dist/webpack";
const a = 1
PDFJS.GlobalWorkerOptions.workerSrc = "pdfjs-dist/build/pdf.worker.js";
import {
  TextLayerBuilder,
  PDFPageView,
  PDFViewer,
  EventBus,
  PDFLinkService,
  PDFFindController,
  DefaultTextLayerFactory,
  getVisibleElements,
  PDFRenderingQueue,
  DefaultAnnotationLayerFactory
} from "pdfjs-dist/web/pdf_viewer";
import "pdfjs-dist/web/pdf_viewer.css";
import PdfSidebar from "./Sidebar/index";
import Toolbar from "./Toolbar/index";
export default {
  computed: {
    parent() {
      return this;
    }
  },
  data() {
    return {
      pdfViewer: null,
      pdfDocument: null,
      searchFor: "",
      error: false
    };
  },
  props: {
    url: String,
    sidebar:{
      type:Boolean,
      default:true
    }
  },
  mounted() {
    this.loadFile();
  },
  components: { Toolbar, PdfSidebar },
  watch: {},
  methods: {
    initEvent() {
      this.eventBus = new EventBus();
      this.pdfLinkService = new PDFLinkService({
        eventBus: this.eventBus
      });

      this.pdfFindController = new PDFFindController({
        eventBus: this.eventBus,
        linkService: this.pdfLinkService
      });

      this.pdfViewer = new PDFViewer({
        container: this.$refs.container,
        eventBus: this.eventBus,
        linkService: this.pdfLinkService,
        findController: this.pdfFindController
      });
      this.pdfLinkService.setViewer(this.pdfViewer);
      this.eventBus.on("pagesinit", () => {
        this.pdfViewer.currentScaleValue = "auto";
      });
    },
    loadFile() {
      this.initEvent();
      this.loadingTask = PDFJS.getDocument({
        url: this.url,
        cMapUrl: "/cmaps/",
        cMapPacked: true
      });
      this.loadingTask.promise
        .then(pdfDocument => {
          this.pdfDocument = pdfDocument;
          this.pdfViewer.setDocument(pdfDocument);
          this.pdfLinkService.setDocument(pdfDocument, null);
        })
        .catch(err => {
          console.log(err)
          this.error = true;
        });
    }
  }
};
</script>

<style lang="scss">
.file-reader-pdf {
  .textLayer .highlight.selected {
    background-color: #f6ff00;
  }
  .textLayer ::selection {
    background: #AFD5FF;
  }
  &__main {
    display: flex;
    flex: 1;
    height: 0;
    &-viewer {
      flex: 1;
      width: 0;
      padding-bottom: 10px;
      background: #3d3d3d;
      height: 100%;
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      overflow: auto;
      .spread > .page {
        &:first-child{
          transform: translateX(-10px);
          margin-left: 20px !important;
        }
        &:last-child{
          transform: translateX(10px);
          margin-right: 20px !important;
        }
      }
      .page {
        background: #fff;
        margin: 10px auto !important;
        position: relative;
        border: 0;
      }
    }
  }
}
</style>
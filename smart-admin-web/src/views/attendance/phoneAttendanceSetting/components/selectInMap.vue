<template>
  <Modal
    v-model="mymoadlStat"
    class="add"
    width="1200"
    :closable="false"
    :mask-closable="false"
    :transfer="false"
    :styles="{ top: '10px' }"
  >
    <Card dis-hover>
      <div>
        <div>
          <span>{{ $t("kqgl.weidu") }}</span>
          <Input style="width: 34%" v-model="fromBaseData2.lang" disabled />
        </div>
        <div style="margin-top: 20px">
          <span>{{ $t("kqgl.jingdu") }}</span>
          <Input style="width: 34%" v-model="fromBaseData2.lat" disabled />
        </div>
      </div>
      <!-- <Form :model="fromBaseData2" label-position="right" :label-width="100">
                  <FormItem :label="$t('kqgl.weidu')">
                    </FormItem>
                    <FormItem :label="$t('kqgl.jingdu')">
                        <Input   style="width: 34%" v-model="fromBaseData2.lat" disabled/>
                    </FormItem>
        </Form> -->
    </Card>
    <div id="map_canvas" style="height: 600px; width: 100%" />
    <div slot="footer">
      <ButtonGroup>
        <Button type="primary" size="large" @click="handsave">{{
          $t("Save")
        }}</Button>
        <Button type="error" size="large" @click="cancel">{{
          $t("Close")
        }}</Button>
      </ButtonGroup>
    </div>
  </Modal>
</template>

<script>
let map;
let lngdata;
let latdata;
export default {
  name: 'selectInMap',
  props: {
    modalstat: {
      type: Boolean,
      default: false
    },
    editData: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      mymoadlStat: this.modalstat,

      fromBaseData2: {
        lang: '',
        lat: ''
      },
      center: { lng: 122.3843288, lat: 11.4574355 }
    };
  },
  watch: {
    modalstat () {
      this.mymoadlStat = this.modalstat;
      this.mapBuild();
    }
  },
  methods: {
    cancel () {
      this.mymoadlStat = false;
      this.$emit('update:modalstat', false);
    },
    handsave () {
      this.mymoadlStat = false;
      this.$emit('update:modalstat', false);
      this.$emit('mapdata', this.fromBaseData2);
    },
    //  地图实例
    mapBuild () {
      // 创建地图实例，zoom是缩放比例
      const map = new google.maps.Map(document.getElementById('map_canvas'), {
        zoom: 6,
        center: this.center,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });
      // 这里因为需要很多标记，所以遍历了this.markers（后端给的数据）来循环创建标记
      let marker;
      let that = this;
      // 点击信息窗口显示
      // google.maps.event.addListener(marker, 'click', function(e) { iw.open(map, marker) })
      google.maps.event.addListener(map, 'click', function (e) {
        if (marker) {
          let latlng = new google.maps.LatLng(e.latLng.lat(), e.latLng.lng());
          marker.setPosition(latlng);
        } else {
          marker = new google.maps.Marker({
            position: { lat: e.latLng.lat(), lng: e.latLng.lng() },
            map: map
          });
        }
        lngdata = e.latLng.lng();
        latdata = e.latLng.lat();
        that.fromBaseData2.lang = lngdata;
        that.fromBaseData2.lat = latdata;
      });
    }
  }
};
</script>

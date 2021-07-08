<template>
  <v-container>
    <v-timeline align-top :dense="$vuetify.breakpoint.smAndDown">
      <v-timeline-item v-for="(item, i) in items" :key="i" fill-dot>
        <template v-slot:opposite>
          <span>Tus eu perfecto</span>
        </template>
        <template v-slot:icon>
          <v-avatar>
            <img src="@/assets/avatar.jpg" alt="qianxi" />
          </v-avatar>
        </template>
        <v-card>
          <v-card-title class="text-h6">
            Lorem Ipsum Dolor
          </v-card-title>
          <v-card-text class="text--accent">
            <p>
              Lorem ipsum dolor sit amet, no nam oblique veritus. Commune
              scaevola imperdiet nec ut, sed euismod convenire principes at. Est
              et nobis iisque percipit, an vim zril disputando voluptatibus, vix
              an salutandi sententiae.
            </p>
            <v-btn class="mx-0" plain>
              <v-icon>mdi-airplane</v-icon>
            </v-btn>
          </v-card-text>
        </v-card>
      </v-timeline-item>
    </v-timeline>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class TimeLine extends Vue {
  items = [
    {
      color: 'red lighten-2'
    },
    {
      color: 'purple darken-1'
    },
    {
      color: 'green lighten-1'
    },
    {
      color: 'indigo'
    }
  ];

  years = [
    {
      color: 'cyan',
      year: '1960'
    },
    {
      color: 'green',
      year: '1970'
    },
    {
      color: 'pink',
      year: '1980'
    },
    {
      color: 'amber',
      year: '1990'
    },
    {
      color: 'orange',
      year: '2000'
    }
  ];
}
</script>

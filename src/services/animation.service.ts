import anime from 'animejs';

export class AnimationService {

  constructor() { }

  public revealing: boolean;
  private spinningTimeline: any;

  reveal(id: string) {
    if (this.spinningTimeline) {
      this.spinningTimeline.pause();
    }
    this.revealing = true;
    anime.timeline({
      loop: false
    })
      .add({ targets: [`#${id}.player`], rotateY: [{ value: 2520, duration: 4000 }], easing: 'easeOutCubic' }, 0)
      .add({ targets: [`#${id} .cover`], opacity: [{ value: 0, duration: 3000 }], easing: 'linear' }, 0)
      .finished.then(() => {
        anime.timeline({
          loop: false
        })
          .add({ targets: [`#${id} .position`], opacity: [{ value: 100, duration: 1000 }] }, 0)
          .add({ targets: [`#${id} .rating`], opacity: [{ value: 100, duration: 1000 }] }, '+=150')
          .add({ targets: [`#${id} .name`], opacity: [{ value: 100, duration: 1000 }] }, '+=500').finished.then(() => {
            this.revealing = false;
          })
      });
  }

  open(id: string): any { //TODO to promise?
    return anime.timeline({
      loop: false
    }).add({ targets: [`#${id} .ribbon`], translateX: [{ value: -250, duration: 150 }], opacity: [{ value: 0, duration: 100 }], easing: 'linear' }, 0)
      .add({ targets: [`#${id} .ribbon`], opacity: [{ value: 0, duration: 150 }], easing: 'linear' }, 0)
  }

  spin(id: string) {
    this.spinningTimeline = anime.timeline({
      loop: true
    }).add({ targets: [`#${id}.player`], rotateY: [{ value: 2520, duration: 4000 }], easing: 'easeOutCubic' });
  }
}

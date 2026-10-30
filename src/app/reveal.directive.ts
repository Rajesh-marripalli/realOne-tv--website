import { Directive, ElementRef, OnDestroy, OnInit, inject } from '@angular/core';

@Directive({ selector: '[appReveal]' })
export class RevealDirective implements OnInit, OnDestroy {
  private readonly element = inject(ElementRef<HTMLElement>);
  private observer?: IntersectionObserver;

  ngOnInit(): void {
    const node = this.element.nativeElement;
    node.classList.add('reveal');
    if (typeof IntersectionObserver === 'undefined' ||
        (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches)) {
      node.classList.add('is-visible');
      return;
    }
    this.observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        node.classList.add('is-visible');
        this.observer?.disconnect();
      }
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
    this.observer.observe(node);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}

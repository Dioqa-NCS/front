import {
  AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild,
} from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { BehaviorSubject } from 'rxjs'
import { SigninComponent } from './auth/signin/signin.component'
import { AuthRole, AuthService } from './auth/auth.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit, OnInit {
  @ViewChild('content', { read: ElementRef, static: false }) content: ElementRef | undefined

  @ViewChild('toolbar', { read: ElementRef, static: false }) toolbar: ElementRef | undefined

  @ViewChild('navList', { read: ElementRef, static: false }) navList: ElementRef | undefined

  openedToolbar = true

  constructor(
    private dialog: MatDialog,
    private renderer: Renderer2,
    public authService: AuthService,
  ) {
  }

  ngOnInit() {
    this.authService.checkAuth().subscribe({})
  }

  ngAfterViewInit() {
    this.recenterMainContent()
  }

  onSignIn() {
    this.dialog.open(SigninComponent, { minWidth: '350px' })
  }

  onClosedSidenav() {
    this.openedToolbar = !this.openedToolbar
  }

  private recenterMainContent() {
    const spaceTop = this.toolbar?.nativeElement.clientHeight
    const minHeightContent = window.innerHeight - spaceTop

    this.renderer.setStyle(this.navList?.nativeElement, 'transform', `translateY(${spaceTop}px)`)
    this.renderer.setStyle(this.content?.nativeElement, 'marginTop', `${spaceTop}px`)
    this.renderer.setStyle(this.content?.nativeElement, 'minHeight', `${minHeightContent}px`)
  }
}

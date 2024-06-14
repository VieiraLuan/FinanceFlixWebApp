import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.videoIdFromRoute = params['videoid'];
      this.videoNameFromRoute = params['videoname'];
    });
  }

  videoIdFromRoute: string = '';
  videoNameFromRoute: string = 'Video Name';
  videoUrl: string = 'https://fiapsaccount.blob.core.windows.net/financeflix-videos/4e4dfdb1-a6f3-483a-a9a8-0465a5e99b03-video.mp4';

}

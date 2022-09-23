import { Component, HostBinding, OnInit } from '@angular/core';
import { Game } from 'src/app/models/game';
import {GamesService} from '../../services/games.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.css']
})
export class GameFormComponent implements OnInit {

  @HostBinding('class') classes = 'row';

  game: Game = {
    id: 0,
    title: '',
    description: '',
    image: '',
    created_at: new Date()
  };

  edit: boolean = false;

  constructor(private gameServices: GamesService, private router: Router, private activedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const params = this.activedRoute.snapshot.params;
    if (params['id']) {
      this.gameServices.getGame(params['id'])
      .subscribe(
        res => {
          console.log(res);
          this.game = res;
          this.edit = true;
        },
        err => console.log(err)
      )
    }
  }

  saveNewGame () {
    delete this.game.created_at;
    delete this.game.id;
    this.gameServices.saveGame(this.game)
      .subscribe({
        next: (res) => {
          console.log(res),
          this.router.navigate(['/games'])
        },
        error: (err) => console.log(err)
      })
  }

  updateGame() {
    delete this.game.created_at;
    const params = this.activedRoute.snapshot.params;
    this.gameServices.updateGame(params['id'], this.game).subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/games']);
      },
      err => console.error(err)
    )
  }

}

import { HostBinding } from '@angular/core';
import { Component, OnInit } from '@angular/core';

import {GamesService} from '../../services/games.service'

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {

  @HostBinding('class') classes = 'row';

  games: any = []; 

  constructor(private gameService: GamesService) { }

  ngOnInit(): void {
    this.getGames();
  }

  getGames() {
    this.gameService.getGames().subscribe({
      next: (res) => {
        this.games = res
      },
      error: (err) => console.log(err)
      })
  }

  deleteGame(id: string) {
    this.gameService.deleteGame(id).subscribe({
      next: (res) => {
        console.log(res),
        this.getGames()
      },
      error: (err) => console.log(err)
    })
  }

}

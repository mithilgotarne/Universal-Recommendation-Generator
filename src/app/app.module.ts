import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { MatInputModule, MatCardModule, MatButtonModule, MatToolbarModule, MatGridListModule, MatIconModule,
  MatProgressSpinnerModule, MatTabsModule, MatChipsModule} from '@angular/material';

import { AppComponent } from './app.component';
import { SimilarComponent } from './components/similar/similar.component';
import { SearchComponent } from './components/search/search.component';
import { ProductComponent } from './components/product/product.component';

import { ElasticsearchService } from './services/elasticsearch.service';
import { ElasticConfigComponent } from './components/elastic-config/elastic-config.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home/phones' },
  { path: 'home/:index', component: HomeComponent },
  { path: 'status', component: ElasticConfigComponent },
  { path: ':index/search', component: SearchComponent },
  { path: 'similar', component: SimilarComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    SimilarComponent,
    SearchComponent,
    ProductComponent,
    ElasticConfigComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatInputModule, MatCardModule, MatButtonModule, MatToolbarModule, MatGridListModule, MatIconModule, MatProgressSpinnerModule,
    FormsModule, ReactiveFormsModule,
    RouterModule.forRoot(routes),
    MatTabsModule, MatChipsModule
  ],
  providers: [
    ElasticsearchService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

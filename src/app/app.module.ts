import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { MatInputModule, MatCardModule, MatButtonModule, MatToolbarModule, MatGridListModule, MatIconModule,
  MatProgressSpinnerModule } from '@angular/material';

import { AppComponent } from './app.component';
import { SimilarComponent } from './components/similar/similar.component';
import { SearchComponent } from './components/search/search.component';
import { ProductComponent } from './components/product/product.component';

import { ElasticsearchService } from './services/elasticsearch.service';
import { ElasticConfigComponent } from './components/elastic-config/elastic-config.component';

const routes: Routes = [
  { path: '', component: ElasticConfigComponent },
  { path: 'search', component: SearchComponent },
  { path: 'similar', component: SimilarComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    SimilarComponent,
    SearchComponent,
    ProductComponent,
    ElasticConfigComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatInputModule, MatCardModule, MatButtonModule, MatToolbarModule, MatGridListModule, MatIconModule, MatProgressSpinnerModule,
    FormsModule, ReactiveFormsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [
    ElasticsearchService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

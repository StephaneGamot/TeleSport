import { Component, OnInit } from "@angular/core";
import { OlympicService } from "src/app/core/services/olympic.service";
import { OlympicCountry } from "src/app/core/models/Olympic";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { Observable } from "rxjs";

@Component({
	selector: "app-details",
	templateUrl: "./details.component.html",
	styleUrls: ["./details.component.scss"],
})
export class DetailsComponent implements OnInit {
	public countryName: string = "";
	public numberOfEntries: number = 0;
	public totalNumberMedals: number = 0;
	public totalNumberOfAthletes: number = 0;
	public countryData: any = null;
	public chartData: any[] = [];
	public olympics$: Observable<OlympicCountry[] | null> | undefined;
	public xAxisLabels: string[] = [];
	public olympicCountry?: OlympicCountry;

	constructor(private activatedRoute: ActivatedRoute, private olympicService: OlympicService, private router: Router) {}

	ngOnInit(): void {
		this.activatedRoute.params.subscribe((params) => {
			const countryName = params["countryName"];
			this.countryName = countryName;
		});
	}

	navigateBackHome(): void {
		this.router.navigate(["/"]);
	}

	ngAfterViewInit(): void {
		this.olympicService.loadInitialData().subscribe(() => {
			this.loadCountryData();
		});
	}

	private loadCountryData(): void {
		this.olympicService.getCountryData(this.countryName).subscribe((data: OlympicCountry | null) => {
			console.log("Data for", this.countryName, data);

			if (data) {
				this.countryData = data;
				this.numberOfEntries = data.participations.length || 0;
				this.totalNumberMedals = 0;
				this.totalNumberOfAthletes = 0;

				if (data.participations && data.participations.length > 0) {
					data.participations.forEach((participation: any) => {
						this.numberOfEntries = data.participations.length;
						this.totalNumberMedals += participation.medalsCount;
						this.totalNumberOfAthletes += participation.athleteCount;
            console.log("Participation Data:", participation);
					});
				}

				this.calculateChartData();
			}
		});
	}

	private calculateChartData(): void {
		if (this.countryData && this.countryData.participations) {
			const medalsByYear: { [year: string]: number } = {};

			this.countryData.participations.forEach((participation: any) => {
				const year = participation.year.toString();
				const medalsCount = participation.medalsCount;

				if (!medalsByYear[year]) {
					medalsByYear[year] = medalsCount;
				} else {
					medalsByYear[year] += medalsCount;
				}
        console.log("Medals By Year (Current Iteration):", medalsByYear);
			});

			this.chartData = Object.keys(medalsByYear).map((year) => ({
				name: year,
				value: medalsByYear[year],
			}));

			const xAxisLabels = this.chartData.map((dataPoint) => dataPoint.name);
			this.xAxisLabels = xAxisLabels;

			console.log("Medals By Year:", this.chartData);
			console.log("X-Axis Labels:", this.xAxisLabels);
		} else {
			this.chartData = [];
		}
	}
}
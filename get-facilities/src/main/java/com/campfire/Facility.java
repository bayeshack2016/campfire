package com.campfire;

import static com.google.common.base.Preconditions.checkNotNull;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.google.common.collect.ImmutableList;

public final class Facility {
	public final Long facilityId;
	@JsonProperty("x") public final ImmutableList<String> dates;
	@JsonProperty("y") public final ImmutableList<Double> fills;
	
	public Facility(Long facilityId, ImmutableList<String> dates, ImmutableList<Double> fills) {
		checkNotNull(facilityId);
		checkNotNull(dates);
		checkNotNull(fills);
		this.facilityId = facilityId;
		this.dates = dates;
		this.fills = fills;
	}

	public static final class Builder {
		private final Long facilityId;
		private final ImmutableList.Builder<String> datesBuilder = ImmutableList.builder();
		private final ImmutableList.Builder<Double> fillsBuilder = ImmutableList.builder();

		public Builder(Long facilityId) {
			checkNotNull(facilityId);
			this.facilityId = facilityId;
		}

		public Builder addEntry(String date, Double fill) {
			checkNotNull(date);
			checkNotNull(fill);
			datesBuilder.add(date);
			fillsBuilder.add(fill);
			return this;
		}

		public Facility build() {
			return new Facility(facilityId, datesBuilder.build(), fillsBuilder.build());
		}
	}
}

package com.ssafy.kkalong.api.repository;

import com.ssafy.kkalong.api.entity.Fitting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FittingRepository extends JpaRepository<Fitting, Integer> {

}